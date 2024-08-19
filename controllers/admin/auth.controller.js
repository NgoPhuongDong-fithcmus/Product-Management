const Account = require("../../models/account.model");
const md5 = require('md5');

//[GET] /admin/auth/login
module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Đăng nhập"
    });
}


//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: email,
        deleted: false
    })

    if(!user) {
        req.flash('error',"Email not exist");
        res.redirect("back");
        return;
    }
    res.send("OK");

}