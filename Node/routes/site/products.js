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


router.post('/cart-products', async (req, res) => {
    const { productIds } = req.body;
    if (!productIds || productIds.length == 0) {
        return res.json([]);
    }

    try {
        const products = await Jewellery.find({ '_id': { $in: productIds } });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;
