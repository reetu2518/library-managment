const express = require("express");
const routes = express();
const userController = require("../controllers/userController")
const categoryController = require("../controllers/categoryController")
const bookController = require("../controllers/bookController")
const bookBorrowController = require("../controllers/bookBorrowController")
const middelware = require("../middelware/middelware")
const multer = require("multer")
const path = require('path');

var b = 'public/images/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, b);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + file.originalname
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

// User Module
routes.post("/register", middelware.signupValidation, userController.signup)
routes.post("/login", middelware.loginValidation , userController.login)
routes.post("/profileEdit", upload.single("profilePic"), userController.profileEdit)
routes.get("/fetchAll", userController.fetchAll)
routes.delete("/userDelete", userController.userDelete)


routes.post("/categoryAdd", middelware.categoryValidation, categoryController.category)

// Book Module
routes.post("/bookAdd", middelware.bookValidation, bookController.bookAdd)
routes.get("/allBooks", bookController.booksFetch)
routes.get("/bookById/:id", bookController.bookFetchById)
routes.get("/booksSortResult/:order", bookController.booksSorted)
routes.get("/searchBookByTitle/", bookController.searchBookByTitle)


// borrow book
routes.post("/borrow", middelware.borrowBookValidation, bookBorrowController.borrowBook)
routes.post("/borrowById", middelware.borrowHistoryByUserId, bookBorrowController.borrowHistoryByUserId)


routes.get("/sendMail", bookBorrowController.sendMail);
routes.post("/payment", bookBorrowController.payment);


// View Engine Setup
routes.set('../views', path.join(__dirname))
routes.set('view engine', 'ejs')


// view html
routes.get('/', function(req, res){
    res.render('Home', {
        key: process.env.PUBLISH_KEY
    })
})
routes.get("/index", (req, res)=>{
    res.render("Index")
})
routes.get("/login", (req, res)=>{
    res.render("login")
})

module.exports = routes;