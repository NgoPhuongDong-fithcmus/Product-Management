const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadCloudinary = require("../../middlewares/admin/uploadCloud.middleware");
// const storageMulter = require("../../helpers/storageMulter");


// const upload = multer({ storage: storageMulter() })

const controller = require("../../controllers/admin/setting.controller")

router.get("/general", controller.general);

router.patch("/general", upload.single('logo'),
uploadCloudinary.uploadCloud, controller.generalPatch);


module.exports = router;
