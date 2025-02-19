
import mongoose from 'mongoose';
// const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
 
  name: { type: String, required: true },
  images: [{ type: String,defalut : [] }],
  category: [{ type: String, required: true }],
  unit: { type: String, default : "1" },
  stock: { type: Number, default: 1 },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  ratings: { type: Number, default: 3 }, 
  trending : {type : Boolean, default : false},
  tags: [{ type: String ,default : ""}], 
  description: { type: String , default : ""},
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      userName: { type: String, required: true },
      UserProfilePic: { type: String, default: "" },
      reviewDate: { type: Date, default: Date.now },
      ratings: { type: Number, required: true, min: 1, max: 5 },
      message : { type : String, required : true, default : ""}
    }
  ],
  publish: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},{
    timestamps: true
});

export default mongoose.models.Product ||  mongoose.model('Product', ProductSchema);
// module.exports = mongoose.model('Product', ProductSchema);

