const express = require("express");
let server=express();
// server.set("view engine","ejs")
server.set("view engine","ejs")
server.use(express.static("public"));

server.get("/contactus",function(req,res){

    res.render("contactus")

})

server.get("/",function(req,res){
    // res.send("Hello people")
    // res.send({name:"Hashim", age:"21"})
    res.render("homepage")

})
server.listen(3000);