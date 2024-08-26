const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");

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

// [GET] /cart

module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartID;

    const cart = await Cart.findOne({
        _id: cartId
    })
    if(cart.products.length > 0){
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id: productId,
                deleted: false
            }).select("title thumbnail slug price discountPercentage");

            productInfo.priceNew = productsHelper.newPriceProduct(productInfo);

            item.productInfo = productInfo;

            item.totalPrice = productInfo.priceNew * item.quantity;

            console.log(item.productInfo);
        }
    }
    

    cart.totalAll = cart.products.reduce((sum, item) => sum + item.quantity * item.productInfo.priceNew, 0);


    // if(cart.products.length > 0) {
    //     for (const item of cart.products) {
    //         const productId = item.product_id;
    //         const productInfo = Product.findOne({
    //             _id: productId
    //         }).select("title thumbnail slug price discountPercentage");

    //         item.productInfo = productInfo;
    //         console.log(item.productInfo);
    //     }
    // }

    console.log(cart);

    res.render("client/pages/cart/index",{
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    });
};