const md5 = require("md5");
const User = require("../../models/user.model");

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register",{
        pageTitle: "Đăng ký tài khoản"
    });
}

module.exports.registerPost = async (req, res) => {
    
    const existedEmail = await User.findOne({
        email: req.body.email
    })

    if(existedEmail) {
        req.flash("error", "Email already have existed!");
        res.redirect("back");
        return;
    }

    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();

    console.log(user);

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
    // res.render("client/pages/user/register",{
    //     pageTitle: "Đăng ký tài khoản"
    // });
}

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login",{
        pageTitle: "Đăng nhập tài khoản"
    });
}

module.exports.loginPost = async (req, res) => {
    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    })

    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    if(md5(password) !== user.password) {
        req.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return;
    }

    if(user.status === "unactive") {
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
    // res.render("client/pages/user/login",{
    //     pageTitle: "Đăng nhập tài khoản"
    // });
}

// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}
