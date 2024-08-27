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

    res.render("client/pages/cart/index",{
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    });
};


// [GET] /delete/:productId
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartID;
    const productId = req.params.productId;

    await Cart.updateOne({
        _id: cartId,
    }, {
        $pull: { products: {product_id: productId}}
    })

    // // cách khác
    // const cart = await Cart.findById(cartId);
    // const indexProduct = cart.products.findIndex(dataIndex => dataIndex.product_id === productId);
    // cart.products.splice(indexProduct, 1);
    // await cart.save()
    
    req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng!");
    res.redirect("back");
}

// [PATCH] /update/:productId/:quantity
module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartID;
    const productId = req.params.productId;
    const quantity = req.params.quantity;

    await Cart.updateOne({
        _id: cartId,
        "products.product_id": productId
    }, {
        $set: { "products.$.quantity":quantity}
    })
    
    req.flash("success", "Cập nhật số lượng thành công!");
    res.redirect("back");
}