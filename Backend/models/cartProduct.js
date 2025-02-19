
import mongoose from 'mongoose';


const CartProductSchema = new mongoose.Schema(
  {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Ensure it's ObjectId
      quantity: { type: Number, required: true, default: 1 },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure it's ObjectId
  },
  { timestamps: true }
);

export default mongoose.model('CartProduct', CartProductSchema);
