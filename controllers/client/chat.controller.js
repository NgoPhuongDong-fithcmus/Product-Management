const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
module.exports.chat = async (req, res) => {

    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // Socket IO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            // Lưu vào database
            const chat = new Chat({
                user_id: userId,
                content: content
            });
            await chat.save();

            // Trả data về cho client có nghĩa là chat xong nó nhận liền hiển thị liền á
            _io.emit("SERVER_RETURN_MESSAGE", {
                fullName: fullName,
                userId: userId,
                content: content
            });
        })

        // Typing
        socket.on("CLIENT_SEND_TYPING", async (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                fullName: fullName,
                userId: userId,
                type: type
            });
        })
        // End Typing
    });

    // Lấy data từ database
    const chats = await Chat.find({deleted: false});

    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullName");

        chat.infoUser = infoUser;
    }
    // End

    // Socket IO
    res.render("client/pages/chat/index",{
        pageTitle: "Chat",
        chats: chats
    });
}