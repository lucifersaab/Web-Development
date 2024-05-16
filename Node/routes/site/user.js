let express = require("express");
let router = express.Router();
let User = require("../../Model/User");
let Jewelery = require("../../Model/Jewels");

router.get("/login/admin", async (req, res) => {
    return res.render("admin/adminForm",{page:"login"})
})

router.post("/login/admin", async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
    //   res.flash("danger", "User not found");
      return res.redirect("register/admin");
    }
    if (user.password != req.body.password) {
    //   res.flash("danger", "Invalid Password");
      return res.redirect("login/admin");
    }
    // req.session.user = user;
    // res.flash("success", user.name + " Logged In");
    return res.redirect("/admin");
  });

  router.get("/logout", (req, res) => {
    req.session.user = null;
    res.flash("success", "Logged out Successfully");
    res.redirect("/login");
  });

router.get("/register/admin", (req, res) => {
  res.render("admin/adminForm",{page: "register"});
});
router.post("/register/admin", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    // req.session.flash = {
    //   type: "danger",
    //   message: "User with given name already exist",
    // };
    // res.flash("danger", "User Already Exist");
    return res.redirect("admin/adminForm",{page:"register"});
  }
  user = new User(req.body);
  await user.save();
  res.render("admin/adminForm",{page:"login"});
});


router.get("/admin/dashboard",async(req,res)=>{
    res.render("admin/productlist")
})


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
    res.render("admin/edit",{product});
  })
  router.get("/admin/:id/edit", async (req, res) => {
    let product = await Jewelery.findById(req.params.id);
    console.log(product)
    return res.render("admin/edit", { product });
  });
router.get("/admin/:page?", async (req, res) => {
    let page = Number(req.params.page) ? Number(req.params.page) : 1;
    let pageSize = 10;
    let products = await Jewelery.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    let total = await Jewelery.countDocuments();
    let totalPages = Math.ceil(total / pageSize);
    res.render("admin/admin", {
      products,
      total,
      page,
      pageSize,
      totalPages,
    });
  });


module.exports = router;