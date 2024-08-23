const Product = require("../../models/product.model")

// [GET] /products

module.exports.index = async (req, res) => {
    const products = await Product.find({}).sort({position: "desc"});
    
    const newProduct = products.map(item => {
        item.priceNew = (item.price * (100 - 50) / 100).toFixed(0);
        return item;
    });

    // cách này dùng vẫn được, nhưng mà dùng cách trên sẽ tối ưu hơn
    products.forEach(item => {
        item.priceNew = item.price * (100 - 50) / 100;
    });

    res.render("client/pages/products/index.pug",{
        pageTitle: "Danh sach san pham",
        products: newProduct
    });
}

// [GET] /products/:slug

module.exports.detail = async (req, res) => {
    try {
        const find = {
          deleted: false,
          slug : req.params.slug,
          status : "active"
        }
      
        const product = await Product.findOne(find);
      
        res.render("client/pages/products/detail", {
          pageTitle: "Chi tiết sản phẩm",
          product: product
        });
      } catch (error) {
        req.flash('error', `Sản phẩm này không tồn tại!`);
        res.redirect(`/products`);
      }
}