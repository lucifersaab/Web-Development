const mongoose= require('mongoose');

const jewelsSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    orders: Number,
    type: String,
    path: String

})

const Jewellery = mongoose.model('Jewels',jewelsSchema)

module.exports=Jewellery;   