const SettingGeneral = require("../../models/setting-general.model");
module.exports.general = async (req, res) => {

    const setting = await SettingGeneral.findOne({});

    res.render("admin/pages/settings/general",{
        pageTitle: "Cài đặt chung",
        setting: setting
    });
}

module.exports.generalPatch = async (req, res) => {
    console.log(req.body);
    const record = await SettingGeneral.findOne({

    });

    if(record) {
        await SettingGeneral.updateOne({
            _id: record.id
        }, req.body);
    }
    else{
        const settingGeneral = new SettingGeneral(req.body);
        await settingGeneral.save();
    }

    res.redirect("back");
}