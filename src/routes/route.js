const express = require('express');
const router = express.Router();
const UserController = require("../controllers/userController")
const commonMW = require("../middlewares/commonMiddlewares")
const ProductController = require("../controllers/productcontroller")
const OrderController = require("../controllers/orderController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/createProduct", ProductController.createProduct)
router.post("/createUser", commonMW.mid1, UserController.createUser)
router.post("/createOrder", commonMW.mid1, commonMW.mid2, OrderController.createOrder)






module.exports = router;