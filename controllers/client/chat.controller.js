

module.exports.chat = async (req, res) => {
    res.render("client/pages/chat/index",{
        pageTitle: "Chat"
    });
}