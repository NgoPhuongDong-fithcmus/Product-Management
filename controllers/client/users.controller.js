const User = require("../../models/user.model");
const usersSocket = require("../../sockets/client/users.socket");

module.exports.notFriend = async (req, res) => {

    // Socket
    usersSocket(res);
    // End Socket

    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id: userId
    })

    const requestFriends = await myUser.requestFriends;
    const acceptFriends = await myUser.acceptFriends;

    const users = await User.find({
        $and: [
            {_id: {$ne: userId}},
            {_id: {$nin: requestFriends}},
            {_id: {$nin: acceptFriends}}
        ],
        status: "active",
        deleted: false  
    }).select("fullName id avatar ")

    res.render("client/pages/users/not-friend",{
        pageTitle: "Danh sách người dùng",
        users: users
    });
} 

module.exports.request = async (req, res) => {

    // Socket
    usersSocket(res);
    // End Socket

    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id: userId
    })

    const requestFriends = myUser.requestFriends;

    const users = await User.find({
        _id: {$in: requestFriends},
        status: "active",
        deleted: false  
    }).select("fullName id avatar ")

    res.render("client/pages/users/request",{
        pageTitle: "Lời mời đã gửi",
        users: users
    });
} 

module.exports.accept = async (req, res) => {

    // Socket
    usersSocket(res);
    // End Socket

    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id: userId
    })

    const acceptFriends = myUser.acceptFriends;

    const users = await User.find({
        _id: {$in: acceptFriends},
        status: "active",
        deleted: false  
    }).select("fullName id avatar ")

    res.render("client/pages/users/accept",{
        pageTitle: "Lời mời kết bạn",
        users: users
    });
} 