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

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    let find = {
        _id: req.params.id,
        deleted: false
    }
    
    try {
        const data = await Account.findOne(find);

        const roles = await Role.find({
            deleted: false
        })

        res.render("admin/pages/accounts/edit",{
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            roles: roles
        });
        
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const emailExisted = await Account.findOne({
            email: req.body.email,
            _id: { $ne: id }, // chú ý cái này ne là not equal để tìm những bản ghi khác thằng đó để cập nhật dữ liệu vì khi cập nhật tên thì email nó vẫn là cái đó nên là sẽ bị nhầm là error
            deleted: false
        });

        if (emailExisted) {
            req.flash('error', 'Email đã tồn tại!');
            return res.redirect("back");
        }

        if (req.body.password) {
            req.body.password = md5(req.body.password);
        } else {
            delete req.body.password;
        }

        await Account.updateOne({ _id: id }, req.body);
        req.flash('success', 'Cập nhật tài khoản thành công');

    } catch (error) {
        req.flash('error', 'Cập nhật tài khoản thất bại!');
    }
    
    res.redirect("back");
};
