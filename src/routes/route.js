const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const WeatherController = require("../controllers/weatherController")
const MemeController = require("../controllers/memeController");
const bookModel = require('../models/bookModel');


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.post("/cowin/getOtp", CowinController.getOtp)





router.get("/cowin/getByDistrict", CowinController.getDistrictsId)

router.get("/weather",WeatherController.weather)

router.post("/meme", MemeController.createMeme)




 
module.exports = router;
 const getallbooks = async function(req,res){
    let allbook = await bookModel.find({authorName:1, bookname:1, _id:0})
    res.status(200).send({msg:allbook})
 }