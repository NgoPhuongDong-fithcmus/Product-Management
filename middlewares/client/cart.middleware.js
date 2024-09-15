const Cart = require("../../models/cart.model");

// module.exports.cartID = async (req,res,next) => {
//     // if(!req.cookies.cartID) {
//     //     const cart = new Cart();
//     //     await cart.save();

//     //     const expiresCookie = 365 * 24 * 60 * 60 * 1000;

//     //     res.cookie("cartID", cart.id, {
//     //         expires: new Date(Date.now() + expiresCookie)
//     //     })

//     //     console.log("vo day tao");
//     // } 
//     // else{
//     //     const cart = await Cart.findOne({
//     //         _id: req.cookies.cartID
//     //     })

//     //     console.log(cart);
        
//     //     if (cart) {
//     //         cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
//     //         res.locals.miniCart = cart;
//     //         next();
//     //     }
        

//     //     // cart.totalQuantity = (cart.products || []).reduce((sum, item) => sum + item.quantity, 0);
        
//     //     // res.locals.miniCart = cart;
//     //     console.log("vo day xu li");
//     // }
//     console.log("vo day xu li");
//     next();
// }
module.exports.cartID = async (req, res, next) => {
    try {
        // console.log("Entering cartID middleware.");

        if (!req.cookies.cartID) {
            // console.log("No cartID cookie found, creating a new cart.");
            
            // Tạo giỏ hàng mới nếu không có cookie `cartID`
            const cart = new Cart();
            await cart.save();

            const expiresCookie = 365 * 24 * 60 * 60 * 1000;

            // Thiết lập cookie với ID giỏ hàng mới
            res.cookie("cartID", cart.id, {
                expires: new Date(Date.now() + expiresCookie),
                httpOnly: true,
            });

            // console.log("Created new cart and set cookie with cartID:", cart.id);
        } else {
            // console.log("Found cartID cookie:", req.cookies.cartID);
            
            // Tìm giỏ hàng hiện tại theo cookie `cartID`
            const cart = await Cart.findOne({ _id: req.cookies.cartID });
            // console.log("Searched for cart with cartID:", req.cookies.cartID);

            if (cart) {
                // Tính tổng số lượng sản phẩm trong giỏ hàng
                cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
                res.locals.miniCart = cart;
            } else {
                // console.log("No cart found with the given cartID.");
            }
        }
        next();
    } catch (err) {
        // console.error("Error in cartID middleware:", err);
        next(err); // Chuyển tiếp lỗi nếu có
    }
}

