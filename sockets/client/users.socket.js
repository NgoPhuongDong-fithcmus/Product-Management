const User = require("../../models/user.model");

module.exports = (res) => {

    // Socket IO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_ADD_FRIEND", async (userId) => {
            const myUserId = res.locals.user.id; // Id cua A
            console.log(userId);  // Id cua B

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
    });
    // End Socket IO
};