const Account = require("../../models/account.model");
const md5 = require('md5');
const Role = require("../../models/role.model");
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

    const roles = await Role.find({
        deleted: false
    })

    res.render("admin/pages/accounts/create",{
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    });
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    const emailExisted = await Account.findOne({
        email: req.body.email,
        deleted: false
    })

    if(emailExisted) {
        req.flash('error', 'This Email have already existed');
        res.redirect("back");
    }
    else{
        req.body.password = md5(req.body.password)
        const record = new Account(req.body);
        await record.save();

        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
    
}