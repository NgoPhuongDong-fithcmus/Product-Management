const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: String,
  product_category_id: {
    type: String,
    default: ""
  },
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
  stock: Number,
  createdBy:{
    account_id: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  deletedBy:{
    account_id: String,
    deletedAt: Date
  },
  // nếu ở đây muốn lưu xem những ai đã thay đổi thì ta dùng object còn không thì ta dùng mảng để lưu người mới cập nhật mới nhất là được rồi
  updatedBy: [
    {
      account_id: String,
      updatedAt: Date
    }
  ]
},{
  timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
