import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import routes from './src/routes/index.js';
import connectDB from './src/config/dbconnection.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/v1', routes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join('../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
