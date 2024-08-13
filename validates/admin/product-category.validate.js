module.exports.createPost =  (req,res, next) => {
    if(!req.body.title) {
        req.flash('error', `Vui lòng nhập tiêu đề`);
        res.redirect("back");
        return;
    }
    // dùng cái này để nó chạy sang phần kế tiếp để xử lí tiếp logic (trong file product.route)
    next();
}