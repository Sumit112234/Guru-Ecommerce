import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
 
  name: { type: String, required: true , unique : true},
  image: { type: String, default : "" },
  desciption : {type : String, default : ""},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},{
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);
