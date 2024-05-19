let express = require("express");
let router = express.Router();
let User = require("../../Model/User");
let Jewellery = require("../../Model/Jewels");

router.get("/product/:type?", async (req, res) => {
    const productType = req.params.type;
    let products;

    if (productType) {
        products = await Jewellery.find({ type: productType });
    } else {
        products = await Jewellery.find();
    }

    res.render("productlist", { products, type: productType });
});
module.exports = router;
