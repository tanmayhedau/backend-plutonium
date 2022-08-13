const userModel = require("../models/userModel");


const createData = async function(req,res){
let data = req.body;
let savedData = await userModel.create(data);
res.send({inserted : savedData});
}

const getUserData = async function(req,res){
    let allUsers = await userModel.find()
    res.send({msg : allUsers})
}

module.exports.createData = createData;
module.exports.getUserData = getUserData;
