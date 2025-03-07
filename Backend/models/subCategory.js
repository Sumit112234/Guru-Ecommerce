const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  image: { type: String },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},{
    timestamps: true
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
