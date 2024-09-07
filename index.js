const express = require("express");
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const multer  = require('multer')
const moment = require('moment')
require("dotenv").config();

const database = require("./config/database.js");
database.connect();

const app = express();
const port = process.env.PORT || 3001;


const systemConfig = require("./config/system.js");

const route = require("./routes/client/index.route.js");
const routeAdmin = require("./routes/admin/index.route.js");

// APP LOCAL khai báo biến toàn cục để dùng trong file bug
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(cookieParser('LLLLLLLLLLL'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
console.log(__dirname);
app.use(express.static(`${__dirname}/public`));

// dung route
route(app);
routeAdmin(app);

app.get("*", (req, res) => {
  res.render("client/pages/error/404",{
    pageTitle: "404 Not Found"
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
