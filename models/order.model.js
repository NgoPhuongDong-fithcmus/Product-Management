const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user_id: String,
  cart_id: String,
  userInfo: {
    fullName: String,
    phone: String,
    address: String
  },
  products:[
    {
        product_id: String,
        price: Number,
        quantity: Number,
        discountPercentage: Number
    }
  ],
  deleted: {
    type: Boolean,
    default: false
  },
  deletedTime: Date
},
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;



// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   order_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Order', // Liên kết với bảng đơn hàng
//     required: true
//   },
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Liên kết với bảng người dùng
//     required: true
//   },
//   payment_method: {
//     type: String,
//     enum: ['COD', 'credit_card', 'paypal', 'momo', 'bank_transfer'],
//     required: true
//   },
//   transaction_id: {
//     type: String,
//     unique: true, // Mã giao dịch từ cổng thanh toán
//     sparse: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'completed', 'failed', 'refunded'],
//     default: 'pending'
//   },
//   payment_time: Date
// }, {
//   timestamps: true
// });

// const Payment = mongoose.model('Payment', paymentSchema);

// module.exports = Payment;

// const mongoose = require('mongoose');

// const shipmentSchema = new mongoose.Schema({
//   order_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Order', // Liên kết với đơn hàng
//     required: true
//   },
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Liên kết với khách hàng nhận hàng
//     required: true
//   },
//   tracking_number: {
//     type: String,
//     unique: true, // Mã vận đơn duy nhất từ đơn vị vận chuyển
//     sparse: true
//   },
//   shipping_company: {
//     type: String,
//     enum: ['GHN', 'GHTK', 'ViettelPost', 'VNPost', 'J&T', 'ShopeeExpress'],
//     required: true
//   },
//   shipping_fee: {
//     type: Number,
//     required: true,
//     default: 0
//   },
//   estimated_delivery: {
//     type: Date, // Ngày dự kiến giao hàng
//     required: true
//   },
//   delivery_status: {
//     type: String,
//     enum: ['pending', 'shipped', 'out_for_delivery', 'delivered', 'canceled', 'returned'],
//     default: 'pending'
//   },
//   delivery_time: Date, // Thời gian giao hàng thực tế (nếu đã giao)
//   notes: String // Ghi chú thêm về vận chuyển
// }, {
//   timestamps: true
// });

// const Shipment = mongoose.model('Shipment', shipmentSchema);

// module.exports = Shipment;

// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Người đánh giá
//     required: true
//   },
//   product_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product', // Sản phẩm được đánh giá
//     required: true
//   },
//   order_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Order', // Đánh giá phải gắn với đơn hàng đã mua
//     required: true
//   },
//   rating: {
//     type: Number,
//     required: true,
//     min: 1, // Đánh giá tối thiểu là 1 sao
//     max: 5  // Đánh giá tối đa là 5 sao
//   },
//   comment: {
//     type: String, // Nội dung đánh giá
//     required: true
//   },
//   images: {
//     type: [String], // Mảng URL hình ảnh đánh giá
//     default: []
//   },
//   created_at: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true
// });

// const Review = mongoose.model('Review', reviewSchema);

// module.exports = Review;


// const mongoose = require('mongoose');

// const voucherSchema = new mongoose.Schema({
//   code: {
//     type: String,
//     required: true,
//     unique: true, // Mã phải là duy nhất
//     uppercase: true // Chuyển thành chữ in hoa
//   },
//   description: {
//     type: String, // Mô tả về voucher
//     default: ''
//   },
//   discount_type: {
//     type: String,
//     enum: ['percentage', 'fixed_amount'], // Giảm theo phần trăm hoặc số tiền cố định
//     required: true
//   },
//   discount_value: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   min_order_value: {
//     type: Number, // Giá trị đơn hàng tối thiểu để áp dụng voucher
//     default: 0
//   },
//   max_discount: {
//     type: Number, // Giới hạn số tiền giảm tối đa (nếu discount_type là percentage)
//     default: null
//   },
//   applicable_products: {
//     type: [mongoose.Schema.Types.ObjectId], // Danh sách sản phẩm áp dụng
//     ref: 'Product',
//     default: []
//   },
//   applicable_users: {
//     type: [mongoose.Schema.Types.ObjectId], // Danh sách người dùng có thể sử dụng voucher
//     ref: 'User',
//     default: []
//   },
//   usage_limit: {
//     type: Number, // Số lần voucher có thể được sử dụng
//     default: null
//   },
//   used_count: {
//     type: Number, // Số lần voucher đã được sử dụng
//     default: 0
//   },
//   start_date: {
//     type: Date, // Ngày bắt đầu áp dụng voucher
//     required: true
//   },
//   expiry_date: {
//     type: Date, // Ngày hết hạn của voucher
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['active', 'expired', 'disabled'], // Trạng thái voucher
//     default: 'active'
//   }
// }, {
//   timestamps: true
// });

// const Voucher = mongoose.model('Voucher', voucherSchema);

// module.exports = Voucher;


// const mongoose = require('mongoose');

// const userVoucherSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', // Liên kết với người dùng
//     required: true
//   },
//   voucher_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Voucher', // Liên kết với voucher
//     required: true
//   },
//   order_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Order', // Liên kết với đơn hàng đã sử dụng voucher (nếu có)
//     default: null
//   },
//   status: {
//     type: String,
//     enum: ['unused', 'used', 'expired'], // Trạng thái: chưa dùng, đã dùng, hết hạn
//     default: 'unused'
//   },
//   received_at: {
//     type: Date,
//     default: Date.now // Thời gian nhận voucher
//   },
//   used_at: {
//     type: Date // Thời gian sử dụng voucher (nếu có)
//   }
// }, {
//   timestamps: true
// });

// const UserVoucher = mongoose.model('UserVoucher', userVoucherSchema);

// module.exports = UserVoucher;
