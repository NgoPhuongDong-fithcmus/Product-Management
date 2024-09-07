const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/chat.controller")
const cartMiddleware = require("../../middlewares/client/cart.middleware");

router.get("/", controller.chat)

module.exports = router;