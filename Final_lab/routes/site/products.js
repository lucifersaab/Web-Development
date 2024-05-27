let express = require("express");
let router = express.Router();
let User = require("../../Model/User");
let Jewellery = require("../../Model/Jewels");
router.get("/product/:type?/:page?", async (req, res) => {
    let page = Number(req.params.page) ? Number(req.params.page) : 1;
    let pageSize = 3;
    const productType = req.params.type;
    const { minValue, maxValue, minOrders, maxOrders, search } = req.query;

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

    if (search) {
        query.name = { $regex: search, $options: 'i' };

        if (!req.session.searchHistory) {
            req.session.searchHistory = [];
        }

        if (!req.session.searchHistory.includes(search)) {
            req.session.searchHistory.push(search);
        }
    }

    try {
        const products = await Jewellery.find(query).skip(pageSize * (page - 1)).limit(pageSize);
        let total = await Jewellery.countDocuments(query);
        let totalPages = Math.ceil(total / pageSize);

        res.render("productlist", {
            products,
            searchHistory: req.session.searchHistory,
            total,
            page,
            pageSize,
            totalPages,
            queryParams: req.query,
            productType
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

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
        res.render("productlist", { products, searchHistory: req.session.searchHistory,
            
        });
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
