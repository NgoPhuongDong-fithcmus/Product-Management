const mongoose = require("mongoose");

module.exports.connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected successfully");
    } catch (error) {
        console.log("Error connecting");
    }
};


// mongoose.connect('mongodb://localhost:27017/your-db-name', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 50000,  // Tăng thời gian chờ kết nối
//     socketTimeoutMS: 45000,  // Tăng thời gian chờ truy vấn
//   });
  