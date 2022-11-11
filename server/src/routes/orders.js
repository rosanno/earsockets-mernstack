import express from 'express';
import { getOrder, postOrder, removeOrder } from '../controllers/order.js';

const router = express.Router();

router.get('/', getOrder);
router.post('/', postOrder);
router.delete('/', removeOrder);

export default router;
