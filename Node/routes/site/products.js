let express = require("express");
let router = express.Router();
let User = require("../../Model/User");
let Jewellery = require("../../Model/Jewels");

router.get("/product/:type?", async (req, res) => {
    const productType = req.params.type;
    const { minValue, maxValue, minOrders, maxOrders } = req.query;

    let query = {};

    if (productType) {
        query.type = productType;
    }

    if (minValue) {
        query.price = { ...query.price, $gte: Number(minValue) };
    }

    if (maxValue) {
        query.price = { ...query.price, $lte: Number(maxValue) };
    }

    if (minOrders) {
        query.orders = { ...query.orders, $gte: Number(minOrders) };
    }

    if (maxOrders) {
        query.orders = { ...query.orders, $lte: Number(maxOrders) };
    }

    try {
        const products = await Jewellery.find(query);
        res.render("productlist", { products });
    } catch (err) {
        res.status(500).send(err.message);
    }
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
