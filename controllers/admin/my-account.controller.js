const Account = require("../../models/account.model");
const md5 = require('md5');
const systemConfig = require("../../config/system");

//[GET] /admin/auth/login
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index",{
        pageTitle: "Trang thông tin cá nhân"
    });
}

module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit",{
        pageTitle: "Chỉnh sửa thông tin cá nhân"
    });
}

module.exports.editPatch = async (req, res) => {
    const id = res.locals.user.id;
    try {
        const emailExisted = await Account.findOne({
            email: req.body.email,
            _id: { $ne: id }, 
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