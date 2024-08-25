const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");   

// [GET] /
module.exports.index = async (req, res) => {
    // Lấy ra sản phẩm nổi bật
    const productsFeatured = await Product.find({
        deleted: false,
        featured: "1",
        status: "active"
    })

    const newProducts = productsHelper.newPriceProducts(productsFeatured);
    // .......

    // Lấy ra sản phẩm mới nhất
    const newProductsList = await Product.find({
        deleted: false,
        status: "active"
        
    }).sort({position : "desc"}).limit(6);

    const newProductsNew = productsHelper.newPriceProducts(newProductsList);
    // .......

    res.render("client/pages/home/index",{
        pageTitle: "Trang chủ",
        productsFeatured : newProducts,
        newProductsList: newProductsNew
    });
}