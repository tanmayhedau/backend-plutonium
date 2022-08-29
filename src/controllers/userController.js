const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req,res) {
  let data = req.body;
  let savedData = await userModel.create(data);
res.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let user = req.user;
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "plutonium",
      organisation: "FunctionUp",
    },
    "functionup-plutonium"
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, data: token });
};

const getUserData = async function (req, res) {
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  res.send({ status: true, data: userDetails });
};

const updateUser = async function (req, res) {
  let userId = req.params.userId;
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData,{new:true} );
  res.send({ status: updatedUser, data: updatedUser });
};

const deleteUser = async function (req,res){
    let userId = req.params.userId;
    let deletedUser = await userModel.findOneAndUpdate({_id:userId}, {isDeleted:true}, {new:true});
    res.send({status:true , data:deletedUser});
}


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
