const express = require("express");
const mongoose = require("mongoose")
let server=express();
// server.set("view engine","ejs")
server.set("view engine","ejs")
server.use(express.static("public"));
server.use(express.json());
// let jewelleryAPI=require("./API/jewelry")

let jewelleryAPI=require("./routes/API/jewelry")

server.use("/",jewelleryAPI)

mongoose.connect("mongodb://localhost:27017").then(()=>{
    console.log("connected db")
})

server.get("/contactus",function(req,res){

    res.render("contactus")

})

server.get("/",function(req,res){
    // res.send("Hello people")
    // res.send({name:"Hashim", age:"21"})
    res.render("homepage")

})
server.listen(3000);