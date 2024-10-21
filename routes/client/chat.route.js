const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadCloudinary = require("../../middlewares/admin/uploadCloud.middleware");

const upload = multer();
const controller = require("../../controllers/client/chat.controller")
const cartMiddleware = require("../../middlewares/client/cart.middleware");

router.get("/", controller.chat)

// router.post("/upload", upload.single('file'), uploadCloudinary.uploadCloud, controller.chatPost)

router.post("/upload", upload.single('file'), (req, res, next) => {
    console.log("File received: ", req.file.buffer);  // Log thông tin file
    next();
}, uploadCloudinary.uploadCloud, controller.chatPost);


module.exports = router;