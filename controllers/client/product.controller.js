const Product = require("../../models/product.model")
const ProductCategory = require("../../models/product.category.model")
const productsHelper = require("../../helpers/products");
const productsCategoryHelper = require("../../helpers/product-category");

// [GET] /products

module.exports.index = async (req, res) => {
    const products = await Product.find({}).sort({position: "desc"});
    
    const newProducts = productsHelper.newPriceProducts(products);

    res.render("client/pages/products/index.pug",{
        pageTitle: "Danh sach san pham",
        products: newProducts
    });
}

// [GET] /products/:slugProduct
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug : req.params.slugProduct,
      status : "active"
    }
  
    const product = await Product.findOne(find);

    if(product.product_category_id) {
      const category = await ProductCategory.findOne({
        status: "active",
        _id: product.product_category_id,
        deleted: false
      })

      product.category = category;
    }

    product.priceNew = productsHelper.newPriceProduct(product);

    res.render("client/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product
    });
  } catch (error) {
    req.flash('error', `Sản phẩm này không tồn tại!`);
    res.redirect(`/products`);
  }
}

// [GET] /products/:slugCategory
module.exports.category = async (req, res, next) => {
  // Tìm ra những danh mục có slug giống với slug mình cần tìm
  const category = await ProductCategory.findOne({
    deleted: false,
    status: "active",
    slug: req.params.slugCategory
  })

  if (!category) {
    return next(); 
  }

  // Lấy ra những slug con
  // const getSubCategory = async (parentId) => {
  //   const subs = await ProductCategory.find({
  //     parent_id: parentId,
  //     status: "active",
  //     deleted: false
  //   })

  //   let allSubs = [...subs];

  //   for(const sub of subs) {
  //     const childs = await getSubCategory(sub.id);
  //     allSubs = allSubs.concat(childs);
  //   }
    
  //   return allSubs;
  // }

  // getSubCategory(category.id);

  const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);
  const listSubCategoryId = listSubCategory.map(item => item.id);


  // Tìm ra những sản phẩm mà có id danh mục giống với id của danh mục vừa mới tìm
  const products = await Product.find({
    product_category_id: { $in: [category.id, ...listSubCategoryId]},
    deleted: false,
    status: "active"
  }).sort({position: "desc"});
  const newProducts = productsHelper.newPriceProducts(products);

  res.render("client/pages/products/index.pug",{
    pageTitle: category.title,
    products: newProducts
  });
}