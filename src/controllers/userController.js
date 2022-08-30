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


const postMessage = async function (req, res){
    let message = req.body.message;
    let user = await userModel.findById(req.params.userId);
    if(!user){
        return res.send({status:false , data: "no such user exists"})
    }else if(user.isDeleted==true){
        res.send("this user is deleted from our database you can't post a message");
    }else{
        let updatedPosts = user.posts;
        updatedPosts.push(message);
        let updatedUser = await userModel.findOneAndUpdate({_id:user._id}, {posts: updatedPosts}, {new:true});
        res.send({status:true , data: updatedUser});
    }
}


module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage;
