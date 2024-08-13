const ProductCategory = require("../../models/product.category.model");
const systemConfig = require("../../config/system");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const records = await ProductCategory.find(find)

    res.render("admin/pages/products-category/index.pug", {
      pageTitle: "Trang danh mục sản phẩm",
      records: records
    });
  };

module.exports.create = async (req, res) => {
  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm",
  });
};

//[POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  if(req.body.position ==""){
    const countProducts = await ProductCategory.countDocuments();
    req.body.position = countProducts + 1;
  }
  else{
    req.body.position = parseInt(req.body.position);
  }

  const records = new ProductCategory(req.body);
  records.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
}