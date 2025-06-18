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

    const listFriends = myUser.friendList.map(friend => friend.user_id.toString());
    

    const requestFriends = await myUser.requestFriends;
    const acceptFriends = await myUser.acceptFriends;

    let users = await User.find({
        $and: [
            {_id: {$ne: userId}},
            {_id: {$nin: requestFriends}},
            {_id: {$nin: acceptFriends}},
            {_id: {$nin: listFriends}}
        ],
        status: "active",
        deleted: false  
    }).select("fullName _id avatar ").lean();

    res.render("client/pages/users/not-friend",{
        pageTitle: "Danh sách người dùng",
        users: users,
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

    console.log(acceptFriends.length);

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

module.exports.getListFriends = async (req, res) => {
    // Socket
    usersSocket(res);
    // End Socket

    const userId = res.locals.user.id;

    const myUser = await User.findOne({
        _id: userId
    });

    const listFriends = myUser.friendList.map(friend => friend.user_id.toString());
    console.log(listFriends);

    // Lấy thông tin bạn bè
    const users = await User.find({
        _id: {$in: listFriends},
        status: "active",
        deleted: false
    }).select("fullName _id avatar").lean();

    res.render("client/pages/users/list-friends", {
        pageTitle: "Danh sách bạn bè",
        listFriends: listFriends,
        users: users
    });
}