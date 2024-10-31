const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 300000, // Tăng thời gian chờ lên 30 giây
            connectTimeoutMS: 100000, // Thời gian chờ kết nối 10 giây
        });
        console.log("Connected successfully");
    } catch (error) {
        console.error("Error connecting:", error); // In chi tiết lỗi
    }
};



// mongoose.connect('mongodb://localhost:27017/your-db-name', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 50000,  // Tăng thời gian chờ kết nối
//     socketTimeoutMS: 45000,  // Tăng thời gian chờ truy vấn
//   });
  