const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    const records = await Account.find(find);

    res.render("admin/pages/accounts/index",{
        pageTitle: "Trang danh sách tài khoản",
        records: records
    });
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/accounts/create",{
        pageTitle: "Trang tạo tài khoản"
    });
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
}