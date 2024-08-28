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