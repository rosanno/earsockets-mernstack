import Cart from '../models/cart.js';
import Order from '../models/order.js';
import Product from '../models/product.js';

const getOrder = async (req, res) => {
  const userId = req.userId;

  try {
    const order = await Order.findOne({ userId });

    if (!order) return res.sendStatus(404);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
};

const postOrder = async (req, res) => {
  const uid = req.userId;

  try {
    const order = await Order.findOne({ userId: uid });
    const cart = await Cart.findOne({ userId: uid }).populate({
      path: 'product.productId',
      select: 'title price total',
    });

    if (order) {
      cart.product.map((item) => {
        order.orders.push({
          _id: item.productId._id,
          title: item.productId.title,
          colorImg: item.colorImg,
          color: item.color,
          status: 'paid',
          quantity: item.quantity,
          price: item.productId.price,
          total: item.total,
        });
      });
      order.subTotal = order.orders
        .map((item) => item.total)
        .reduce((acc, next) => acc + next);
      updateStock(cart);
      await order.save();
      res.sendStatus(200);
    } else {
      let items = [];
      cart.product.map((item) =>
        items.push({
          _id: item.productId._id,
          title: item.productId.title,
          colorImg: item.colorImg,
          color: item.color,
          status: 'paid',
          quantity: item.quantity,
          price: item.productId.price,
          total: item.total,
        })
      );

      const newOrder = new Order({
        userId: uid,
        orders: items,
        subTotal: cart.subTotal,
      });
      updateStock(cart);
      await newOrder.save();
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
  }
};

const removeOrder = async (req, res) => {
  const userId = req.userId;
  const productId = req.body.productId;
  console.log(productId);

  try {
    let order = await Order.findOne({ userId });
    const foundOrder = order.orders.findIndex(
      (item) => item._id.toString() === productId
    );

    if (foundOrder !== -1) {
      order.orders.splice(foundOrder, 1);
      if (order.orders.length === 0) {
        order.subTotal = 0;
      } else {
        order.subTotal = order.orders
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      }
    } else {
      res.status(404).json({ msg: 'No order found.' });
    }

    await order.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

export { getOrder, postOrder, removeOrder };

const updateStock = (cart) => {
  cart.product.map(async (item) => {
    const product = await Product.findById({ _id: item.productId._id });
    product.stock -= item.quantity;
    await product.save();
  });
};
