const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");   

// [GET] /
module.exports.index = async (req, res) => {

    const productsFeatured = await Product.find({
        deleted: false,
        featured: "1",
        status: "active"
    })


    const newProducts = productsHelper.newPriceProducts(productsFeatured);

    console.log(newProducts)

    res.render("client/pages/home/index",{
        pageTitle: "Trang chủ",
        productsFeatured : newProducts
    });
}