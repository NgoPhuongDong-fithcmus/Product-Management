const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  status: String,
  slug: { 
    type: String, 
    slug: "title" ,
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedTime: Date,
  position: Number,
  discountPercentage: Number,
  stock: Number
},{
  timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
