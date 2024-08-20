const Account = require("../../models/account.model");
const md5 = require('md5');
const systemConfig = require("../../config/system");

//[GET] /admin/auth/login
module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Đăng nhập"
    });
}


//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: email,
        deleted: false
    })

    console.log(user);

    if(!user) {
        req.flash('error',"Email not exist");
        res.redirect("back");
        return;
    }

    if(md5(password) != user.password) {
        req.flash('error',"Password is incorrect");
        res.redirect("back");
        return;
    }

    if(user.status == "unactive") {
        req.flash('error',"Your password is locked");
        res.redirect("back");
        return;
    }

    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);

}

//[GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
}
