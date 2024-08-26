const Cart = require("../../models/cart.model");

module.exports.addPost = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    const cartId = req.cookies.cartID;

    const cart = await Cart.findOne({
        _id: cartId,
    })

    const existedProductInCart = cart.products.find(item => item.product_id == productId);

    console.log(existedProductInCart);

    if(existedProductInCart) {
        const quantityNew = quantity + existedProductInCart.quantity;
        await Cart.updateOne({
            _id : cartId,
            "products.product_id" : productId
        },{
            $set: {
                "products.$.quantity" : quantityNew
            }
        })
    }
    else{
        const objectCart = {
            product_id: productId,
            quantity: quantity
        }

        await Cart.updateOne(
            {
                _id: cartId
            },
            {
                $push: {products: objectCart}
            }
        );
    }

    req.flash("success", "Đã thêm sản phẩm vào giỏ hàng thành công!");
    res.redirect("back");
}