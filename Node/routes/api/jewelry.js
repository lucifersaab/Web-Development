let express = require("express");
let router = express.Router();
let Jewelery = require("../../Model/Jewels");

router.get("/api/jewelry/:id", async (req, res) => {
    let jewel = await Jewelery.findById(req.params.id);
    return res.send(jewel);
});
router.put("/api/jewelry/:id", async (req, res) => {
    let jewel = await Jewelery.findById(req.params.id);
    jewel.name = req.body.name;
    // jewel.name = req.body.name;
    
    await jewel.save();
    return res.send(jewel);
});
router.delete("/api/jewelry/:id", async (req, res) => {
    let game = await Jewelery.findByIdAndDelete(req.params.id);
    return res.send(game);
});

router.post("/api/jewelry", async (req, res) => {
    let data = req.body;
    let record = new Jewelery(data);

    try {
        await record.save();
        return res.send(record);
    } catch (error) {
        console.error('Error saving landscape:', error);
        // Respond with a server error status and the error message
        return res.status(500).send(error.message);
    }
});

router.get("/api/jewelry", async function (req, res) {
    let landscapes = await Jewelery.find();
    return res.send(landscapes);
});

module.exports = router;