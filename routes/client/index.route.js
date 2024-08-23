const categoryMiddleware = require("../../middlewares/client/category.middleware");
const productRoutes = require("./product.route")
const homeRoutes = require("./home.route");
module.exports = (app) => {

    app.use("/", categoryMiddleware.category, homeRoutes);
      
    app.use("/products", categoryMiddleware.category, productRoutes);
}