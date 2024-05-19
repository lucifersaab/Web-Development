const express = require("express");
const mongoose = require("mongoose")
let server=express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const isAuthenticated = require("./Middleware/isAuthenticated");
let jewelleryAPI=require("./routes/api/jewelry")
let userAPI=require("./routes/site/user");
let productsAPI=require("./routes/site/products");
let expressLayouts = require("express-ejs-layouts");

server.use(session({
    secret: 'secrettt', 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100000 }
}));
server.use(require("./Middleware/siteMiddleware"));
server.use(express.json());
server.use(express.urlencoded());
server.set("view engine", "ejs");
server.use(express.static('public'));
server.use(express.static('assets'))
server.use(cookieParser());
server.use("/",userAPI)
server.use("/",jewelleryAPI)
server.use("/",productsAPI)
server.use(expressLayouts);

mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("connected db")
})

server.get("/",function(req,res){
    res.render("homepage",{layout:true})
})
server.get("/contactus",function(req,res){
    res.render("contactus",{layout:false})
})

server.get("/reviews",function(req,res){
    res.render("reviewpage",{layout:false})
})

server.get('/cart-products', async (req, res) => {
    res.render("cartPage",{layout:true})
});

server.listen(3000);