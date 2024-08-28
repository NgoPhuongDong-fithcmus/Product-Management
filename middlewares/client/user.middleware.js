const User = require("../../models/user.model");

module.exports.infoUser = async (req, res, next) => {
    console.log(req.cookies.tokenUser);
    if(req.cookies.tokenUser) {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            status: "active",
            deleted:false
        })

        console.log(user);

        if(user) {
            res.locals.user = user;
        }
    }
    next();
}