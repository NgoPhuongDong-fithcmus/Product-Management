const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const uploadToCloudinary = require("../../helpers/uploadToCloudinary");

const chatSocket = require("../../sockets/client/chat.socket");

module.exports.chat = async (req, res) => {

    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // Socket IO
    chatSocket(res);
    // End Socket IO


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

module.exports.chatPost = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("Không có file nào được tải lên.");
        }
        const filePath = `/uploads/${req.file.originalname}`;  // Đường dẫn lưu file

        res.json({ filePath: filePath });  // Trả về đường dẫn file cho client
    } catch (err) {
        console.error(err);
        res.status(500).send("Lỗi server trong quá trình tải file.");
    }
}