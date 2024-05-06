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

router.post("/admin/newproduct", async (req, res) => {
    let data = req.body;
    let record = new Jewelery(data);

    try {
        await record.save();
        return res.redirect("/admin");
    } catch (error) {
        console.error('Error saving admin:', error);
        // Respond with a server error status and the error message
        return res.status(500).send(error.message);
    }
});



router.post("/admin/:id/edit", async (req, res) => {
    let product = await Jewelery.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.orders= req.body.orders;
    product.path=req.body.path;
    product.type=req.body.type;
    product.description=req.body.description;
    await product.save();
    return res.redirect("/admin");
  });


router.get("/admin/:id/delete", async (req, res) => {
    await Jewelery.findByIdAndDelete(req.params.id);
  
    return res.redirect("/admin");
  });

  router.get("/admin/newproduct",async(req,res)=>{
    let product=null;
    res.render("edit",{product});
  })
  router.get("/admin/:id/edit", async (req, res) => {
    let product = await Jewelery.findById(req.params.id);
    console.log(product)
    return res.render("edit", { product });
  });
router.get("/admin/:page?", async (req, res) => {
    let page = Number(req.params.page) ? Number(req.params.page) : 1;
    let pageSize = 10;
    let products = await Jewelery.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    let total = await Jewelery.countDocuments();
    let totalPages = Math.ceil(total / pageSize);
    res.render("admin", {
      products,
      total,
      page,
      pageSize,
      totalPages,
    });
  });

module.exports = router;