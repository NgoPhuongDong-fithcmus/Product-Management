const md5 = require("md5");
const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");
const generateHelper = require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");
const sendMailHelper = require("../../helpers/sendMail");

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

    const cartUserLogin = await Cart.findOne({
        user_id : user.id
    });

    if(cartUserLogin){
        res.cookie("cartID", cartUserLogin.id);
    }
    else{
        await Cart.updateOne({
            _id: req.cookies.cartID
        },{
            user_id: user.id
        })
    }
    

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}

// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.clearCookie("cartID");

    res.redirect("/");
}

// [GET] /user/forgot/password/forgot/
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password",{
        pageTitle: "Đăng nhập tài khoản"
    });
}

module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if(!user) {
        req.flash("error", "Email này không tồn tại!");
        res.redirect("back");
        return;
    }

    // Lưu thông tin vào DB

    const otp = generateHelper.generateRandomNumber(8);

    const objectForgotPassword = {
        email: email,
        OTP: otp,
        expireAt: Date.now() + 3000000
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Nếu email tồn tại thì gửi OTP qua email
    const subject = "Mã xác thực OTP để lấy lại mật khẩu của bạn ";
    const html = `Mã OTP để lấy lại mật khẩu là: <b>${otp}</b>. Thời hạn sử dụng là 3p`;
    sendMailHelper.sendMail(email,subject,html);

    res.redirect(`/user/password/otp?email=${email}`);
}

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password",{
        pageTitle: "Nhập mã OTP",
        email: email
    });
}

// // [POST] /user/password/otp
// module.exports.otpPasswordPost = async (req, res) => {
//     const email = req.body.email;
//     const otp = req.body.otp;

//     const result = await ForgotPassword.findOne({
//         email: email,
//         OTP: otp
//     });


//     if(!result) {
//         req.flash('error', 'OTP không hợp lệ!');
//         res.redirect("back");
//         return;
//     }

//     const user = await User.findOne({
//         email: email
//     });

//     res.cookie("tokenUser", user.tokenUser);

//     res.redirect("/user/password/reset");
// }

// module.exports.resetPassword = async (req, res) => {
//     res.render("client/pages/user/reset-password",{
//         pageTitle: "Đổi mật khẩu"
//     });
// }

// module.exports.resetPasswordPost = async (req, res) => {

//     const password = req.body.password;
//     const confirmPassword = req.body.confirmPassword;
//     const token = req.cookies.tokenUser;

//     await User.updateOne({
//         tokenUser: token,
//     },
//     {
//         password: md5(password)
//     })
    
//     req.flash("success", "Đổi mật khẩu thành công");
//     res.redirect("/")
// }




// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        OTP: otp
    });

    // Xử lý nếu không tìm thấy OTP khớp
    if (!result) {
        req.flash('error', 'OTP không hợp lệ!');
        return res.redirect("back");
    }

    const user = await User.findOne({
        email: email
    });

    // Xử lý nếu không tìm thấy người dùng
    if (!user) {
        req.flash('error', 'Không tìm thấy người dùng!');
        return res.redirect("back");
    }

    // // Hủy OTP sau khi sử dụng để ngăn chặn việc tái sử dụng
    // await ForgotPassword.deleteOne({
    //     email: email,
    //     OTP: otp
    // });

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
}

module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu"
    });
}

module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const token = req.cookies.tokenUser;

    // Kiểm tra sự tồn tại của tokenUser trước khi tiếp tục
    if (!token) {
        req.flash("error", "Không tìm thấy token người dùng. Vui lòng thử lại.");
        return res.redirect("back");
    }

    // Tìm người dùng dựa trên tokenUser
    const user = await User.findOne({
        tokenUser: token
    });

    if (!user) {
        req.flash("error", "Không tìm thấy người dùng.");
        return res.redirect("back");
    }

    // Cập nhật mật khẩu người dùng
    await User.updateOne(
        { tokenUser: token },
        { password: md5(password) }
    );

    // Xóa tokenUser khỏi cookie sau khi đổi mật khẩu thành công
    res.clearCookie("tokenUser");

    req.flash("success", "Đổi mật khẩu thành công");
    res.redirect("/");
}


module.exports.info = async (req, res) => {
    const tokenUser = req.cookies.tokenUser;

    const infoUser = await User.findOne({
        tokenUser: tokenUser
    }).select("-password");

    res.render("client/pages/user/info",{
        pageTitle: "Thông tin tài khoản",
        infoUser: infoUser
    });
}
