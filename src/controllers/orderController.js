// const OrderModel = require("../models/orderModel")
const UserModel = require("../models/userModel")
const ProductModel = require("../models/productModel")
const OrderModel = require("../models/orderModel")

const createOrder = async function (req, res) {
    let data = req.body
    let userId = data.userId
    let productId = data.productId
    let savedData;
    data.isFreeAppUser = req.isFreeAppUser
    if (data.isFreeAppUser == "true") {
        data.amount = 0;
        savedData = await OrderModel.create(data)
    } else {
        let savedProduct = await ProductModel.findById(productId).select({ price: 1, _id: 0 })
        let price = savedProduct.price
        let savedUser = await UserModel.findById(userId).select({ balance: 1, _id: 0 })
        let balance = savedUser.balance
        if (price <= balance) {
            await UserModel.findOneAndUpdate({ _id: data.userId }, { $inc: { balance: -(price) } })
            data.amount = price
            savedData = await OrderModel.create(data)
        } else {
            return res.send({ Error: " balance is insufficient" })
        }
    }
    res.send({ msg: savedData })
}

module.exports.createOrder = createOrder