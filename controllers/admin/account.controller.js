const Account = require("../../models/account.model");
const md5 = require('md5');
const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }
    // select đó để lấy tất cả trừ 2 cái kia
    const records = await Account.find(find).select("-password -token");

    for (const record of records) {
        const role = await Role.findOne({
            deleted: false,
            _id : record.role_id
        });
        record.role = role;
    }


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