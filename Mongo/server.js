const express= require("express");
const mongoose= require("mongoose");

let server=express();

server.get("/api/mobile", function(req,res){

    res.send([
        {name:"s3", brand:"Samsung",price:50000},
        {name:"iphone 15", brand:"Apple", price:100000}
    ])
})


server.listen(4000);