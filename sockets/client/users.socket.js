const User = require("../../models/user.model");

module.exports = (res) => {

    // Socket IO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id; // Id cua A
            // console.log(userId);  // Id cua B

            // Thêm id của A vào acceptFriends của B: là khi A gửi lời kết bạn cho B thì A sẽ nằm trong list để được B accept

            const existedARequestOflistB = await User.findOne({
                _id:  userId,
                acceptFriends: myUserId
            })

            if(!existedARequestOflistB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {acceptFriends: myUserId}
                })
            }

            // Thêm id của B vào requestFriends của A: là khi A gửi lời kết bạn cho B thì B sẽ nằm trong list request kết bạn của A  
            const existedBOflistA = await User.findOne({
                _id:  myUserId,
                requestFriends: userId
            })

            if(!existedBOflistA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {requestFriends: userId}
                })
            }

        })

        socket.on("CLIENT_CANCEL_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id; // Id cua A
            // console.log(userId);  // Id cua B

            // Xóa id của A trong accepts của B

            const existedARequestOflistB = await User.findOne({
                _id:  userId,
                acceptFriends: myUserId
            })

            if(existedARequestOflistB) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {acceptFriends: myUserId}
                })
            }

            // Xóa id của B trong request của A 
            const existedBOflistA = await User.findOne({
                _id:  myUserId,
                requestFriends: userId
            })

            if(existedBOflistA) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: {requestFriends: userId}
                })
            }

        })

        socket.on("CLIENT_REFUSE_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id; // Id cua B
            // console.log(userId);  // Id cua A

            // Xóa id của A trong accepts của B

            const existedARequestOflistB = await User.findOne({
                _id:  myUserId,
                acceptFriends: userId
            })

            if(existedARequestOflistB) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $pull: {acceptFriends: userId}
                })
            }

            // Xóa id của B trong request của A 
            const existedBOflistA = await User.findOne({
                _id:  userId,
                requestFriends: myUserId
            })

            if(existedBOflistA) {
                await User.updateOne({
                    _id: userId
                }, {
                    $pull: {requestFriends: myUserId}
                })
            }

        })

        socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id; // Id cua B
            // console.log(userId);  // Id cua A


            // Xóa id của A trong accepts của B\
            // Thêm {userId, room chat id} của A vào trong friendList của B
            const existedARequestOflistB = await User.findOne({
                _id:  myUserId,
                acceptFriends: userId
            })

            if(existedARequestOflistB) {
                await User.updateOne({
                    _id: myUserId
                }, {
                    $push: {
                        friendList: {
                            user_id: userId,
                            room_chat_id: ""
                        }
                    },
                    $pull: {acceptFriends: userId}
                })
            }

            // Xóa id của B trong request của A 
            // Thêm {userId, room chat id} của A vào trong friendList của B
            const existedBOflistA = await User.findOne({
                _id:  userId,
                requestFriends: myUserId
            })

            if(existedBOflistA) {
                await User.updateOne({
                    _id: userId
                }, {
                    $push: {
                        friendList: {
                            user_id: myUserId,
                            room_chat_id: ""
                        }
                    },
                    $pull: {requestFriends: myUserId}
                })
            }

        })

    });
    // End Socket IO
};