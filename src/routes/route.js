const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const commonMW = require("../middleware/auth")


router.post("/users", userController.createUser)

router.post("/login", commonMW.userLogin, userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId/fetch", commonMW.authenticate, commonMW.verifyToken, commonMW.authorise, userController.getUserData)
// router.post("/users/:userId/posts", userController.postMessage)


router.put("/users/:userId", commonMW.authenticate, commonMW.verifyToken, commonMW.authorise, userController.updateUser)
router.delete('/users/:userId', commonMW.authenticate, commonMW.verifyToken, commonMW.authorise, userController.deleteUser)
router.post("/users/:userId/posts", commonMW.authenticate, commonMW.verifyToken, commonMW.authorise, userController.postMessage)
module.exports = router; 

