import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

  userId: { type: String, ref: "User", required: true },
  orderId: { type: String, required: true },
  quantity : {type : String , default : 1},
  product_details: [{ type: mongoose.Schema.Types.Mixed, ref : "Product" , required: true }],
  payment_id: { type: String },
  payment_status: { type: String },
  delivery_address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  delivery_status: { type: String },
  subTotalAmt: { type: Number },
  totalAmt: { type: Number },
  invoice_receipt: { type: String },
  payment_type : {type : String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
},{
    timestamps: true
});


export default mongoose.models.Order ||  mongoose.model('Order', OrderSchema);
// module.exports = mongoose.model("Order", OrderSchema);
