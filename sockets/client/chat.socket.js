const uploadToCloudinary = require("../../helpers/uploadToCloudinary");
const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");

module.exports = (res) => {

    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // Socket IO
    _io.once('connection', (socket) => {
        socket.on("CLIENT_SEND_MESSAGE", async (messageData) => {

            // const { content, imageBuffer } = messageData;
            // const images = await uploadToCloudinary(imageBuffer);

            // // const images = messageData.imageUrl;
            // // console.log(images);
            

            // // // Lưu vào database
            // const chat = new Chat({
            //     user_id: userId,  
            //     content: content,
            //     images: images
            // });
            // await chat.save();

            // // // Trả data về cho client có nghĩa là chat xong nó nhận liền hiển thị liền á
            // _io.emit("SERVER_RETURN_MESSAGE", {
            //     fullName: fullName,
            //     userId: userId,  
            //     content: content,
            //     images: images
            // });
            try {
                const { content, imageBuffer } = messageData;
    
                // Xử lý upload ảnh lên Cloudinary (nếu có ảnh)
                let images = "";
                if (imageBuffer) {
                    images = await uploadToCloudinary(imageBuffer);
                }
    
                // Lưu dữ liệu chat vào cơ sở dữ liệu
                const chat = new Chat({
                    user_id: userId,  
                    content: content,
                    images: images
                });
                await chat.save();
    
                // Phát lại tin nhắn cho tất cả client
                _io.emit("SERVER_RETURN_MESSAGE", {
                    fullName: fullName,
                    userId: userId,  
                    content: content,
                    images: images
                });
            } catch (error) {
                console.error("Error in CLIENT_SEND_MESSAGE:", error);
            }
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
    // End Socket IO
};