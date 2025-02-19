import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({

  address_line: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String,default : "India" },
  mobile: { type: Number, required: true },
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},{
    timestamps: true
});

export default mongoose.models.Address || mongoose.model('Address', AddressSchema);
