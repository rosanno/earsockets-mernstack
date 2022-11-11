import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  orders: { type: Array },
  subTotal: { type: Number, required: true, default: 0 },
});

export default mongoose.model('Order', ordersSchema);
