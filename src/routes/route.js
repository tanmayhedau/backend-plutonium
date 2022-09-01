const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const WeatherController = require("../controllers/weatherController")
const MemeController = require("../controllers/memeController")


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)
router.post("/cowin/getOtp", CowinController.getOtp)





router.get("/cowin/getByDistrict", CowinController.getDistrictsId)

router.get("/weather",WeatherController.weather)

router.post("/meme", MemeController.createMeme)




 
module.exports = router;