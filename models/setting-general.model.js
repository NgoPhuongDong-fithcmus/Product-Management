const mongoose = require("mongoose");

const settingGeneralSchema = new mongoose.Schema({
  websiteName: String,
  logo: String,
  phone: String,
  address: String,
  copyright: String,
  email: String
},
  {
    timestamps: true
  }
);

const SettingGeneral = mongoose.model("SettingGeneral", settingGeneralSchema, "setting-general");

module.exports = SettingGeneral;
