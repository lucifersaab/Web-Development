const express = require("express");
const mongoose = require("mongoose")
let server=express();
server.use(express.json());
server.use(express.urlencoded());
server.set("view engine", "ejs");
server.use(express.static('public'));
server.use(express.static('assets'))

let jewelleryAPI=require("./routes/api/jewelry")

server.use("/",jewelleryAPI)

mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("connected db")
})

server.get("/adminlogin",function(req,res){

    res.render("adminlogin")

})

server.get("/productlist",function(req,res){

    res.render("productlist")

})

server.get("/contactus",function(req,res){

    res.render("contactus")

})

server.get("/reviews",function(req,res){

    res.render("reviewpage")

})


server.get("/",function(req,res){

    res.render("homepage")

})
server.listen(3000);