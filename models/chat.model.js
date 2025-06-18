const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    user_id: String,
    room_chat_id: String,
    content: String,
    images: Array,
    deleted:{
        type: Boolean,
        default: false,
    },
    deletedTime: Date
},
  {
    timestamps: true
  }
);

const Chat = mongoose.model("Chat", chatSchema, "chats");

module.exports = Chat;



// const mongoose = require('mongoose');

// const favouriteSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Người dùng đã thích sản phẩm
//     required: true
//   },
//   product_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product', // Sản phẩm được yêu thích
//     required: true
//   },
//   added_at: {
//     type: Date,
//     default: Date.now // Thời gian thêm vào danh sách yêu thích
//   }
// }, {
//   timestamps: true
// });

// // Đảm bảo mỗi người dùng chỉ có thể thêm một sản phẩm vào danh sách yêu thích một lần
// favouriteSchema.index({ user_id: 1, product_id: 1 }, { unique: true });

// const Favourite = mongoose.model('Favourite', favouriteSchema);

// module.exports = Favourite;
