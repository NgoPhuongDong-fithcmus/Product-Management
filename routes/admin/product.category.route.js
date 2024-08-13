const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../../controllers/admin/product-category.controller");
const validate = require("../../validates/admin/product-category.validate");
const uploadCloudinary = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloudinary.uploadCloud,
  validate.createPost,
  controller.createPost
);

module.exports = router;
