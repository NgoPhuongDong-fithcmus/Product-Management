

module.exports.chat = async (req, res) => {
    // Socket IO
    _io.on('connection', (socket) => {
        console.log('a user connected', socket.id);
    });
    // Socket IO
    res.render("client/pages/chat/index",{
        pageTitle: "Chat"
    });
}