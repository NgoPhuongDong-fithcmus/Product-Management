// [GET] /admin/dashboard

module.exports.dashboard = (req, res) => {

    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0
        },

    }

    res.render("admin/pages/dashboard/index.pug",{
        pageTitle: "Trang tổng quan",
        statistic: statistic
    });
}


// const Product = require("../../models/product.model")

// module.exports.index = async (req, res) => {
//     const products = await Product.find({});
    
//     const newProduct = products.map(item => {
//         item.priceNew = (item.price * (100 - 50) / 100).toFixed(0);
//         return item;
//     });

//     // cách này dùng vẫn được, nhưng mà dùng cách trên sẽ tối ưu hơn
//     products.forEach(item => {
//         item.priceNew = item.price * (100 - 50) / 100;
//     });

//     res.render("client/pages/products/index.pug",{
//         pageTitle: "Danh sach san pham",
//         products: newProduct
//     });
// }