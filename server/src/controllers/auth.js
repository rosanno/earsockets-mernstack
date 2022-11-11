import User from '../models/user.js';
import CryptoJs from 'crypto-js';
import dotenv from 'dotenv';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generateToken.js';

dotenv.config();

const signup = async (req, res) => {
  const { name, address, email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      const hashPassword = CryptoJs.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      );

      const newUser = new User({
        name,
        address,
        email,
        password: hashPassword,
      });

      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      newUser.refreshToken = [refreshToken];
      const user = await newUser.save();

      res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ user, accessToken });
    } else {
      return res.status(409).json({ message: 'Email already registered' });
    }
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email: email });

    if (!foundUser)
      return res.status(404).json({ message: 'Invalid email or password.' });

    const decodePassword = CryptoJs.AES.decrypt(
      foundUser.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(CryptoJs.enc.Utf8);

    if (decodePassword !== password)
      return res.status(401).json({ message: 'Invalid email or password.' });

    const accessToken = generateAccessToken(foundUser);
    const refreshToken = generateRefreshToken(foundUser);

    if (foundUser) {
      foundUser.refreshToken = [refreshToken];
      await foundUser.save();
      const { password, ...user } = foundUser._doc;

      res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'None',
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ user, accessToken });
    }
  } catch (error) {
    console.log(error);
  }
};

export { signup, login };
