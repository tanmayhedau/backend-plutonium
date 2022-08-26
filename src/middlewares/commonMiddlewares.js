const UserModel = require("../models/userModel")
const ProductModel = require("../models/productModel")

const mid1 = function (req, res, next) {

    if (req.headers.isfreeappuser) {
         req.isFreeAppUser = req.headers.isfreeappuser; 
        next()   
    } else {
        res.send({ Error: "missing a mandatory header" })
    }
}

const mid2 = async function (req, res, next) {
    let data = req.body
    let userId = data.userId
    let productId = data.productId
    let savedUserData = await UserModel.findById(userId)
    let savedProductData = await ProductModel.findById(productId)
    if (savedUserData && savedProductData) {
        next()
    } else if (!savedUserData && !savedProductData) {
        res.send({ Error: "userId and productId is missing" })
    } else if (!savedUserData) {
        res.send({ Error: "userId is missing" })
    } else if (!savedProductData) {
        res.send({ Error: "productId is missing" })
    }
}




module.exports.mid1 = mid1
module.exports.mid2 = mid2

