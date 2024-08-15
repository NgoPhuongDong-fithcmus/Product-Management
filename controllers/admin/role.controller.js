
const Role = require("../../models/product.model");
// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Role.find(find);

    res.render("admin/pages/roles/index.pug",{
        pageTitle: "Trang nhóm quyền",
        records: records
    });
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {

    res.render("admin/pages/roles/create",{
        pageTitle: "Trang nhóm quyền"
    });
}

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {

    res.send("OKE")
}