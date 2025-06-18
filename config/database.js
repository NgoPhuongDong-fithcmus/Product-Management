const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 300000,
            connectTimeoutMS: 100000,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true
        });
        console.log("Connected successfully");
    } catch (error) {
        console.error("Error connecting:", error);
    }
};
