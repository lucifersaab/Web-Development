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

module.exports = router;