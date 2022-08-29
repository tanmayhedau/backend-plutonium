const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authenticate = function (req, res, next) {
    let token = req.headers["x-Auth-token"];
    if (!token) {
        token = req.headers["x-auth-token"];
    } if (!token) {
        return res.send({ status: false, data: "token is mandatory" });
    }
    next();
}


const userLogin = async function (req, res, next) {
    let userName = req.body.emailId;
    let password = req.body.password;
    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user) {
        return res.send({ status: false, data: "username or password is not correct" });
    } else {
        req.user = user;
        next();
    }

}


const verifyToken = function (req, res, next) {

    let token = req.headers["x-Auth-token"];
    if (!token) token = req.headers["x-auth-token"];
    let decodedToken = jwt.verify(token, 'functionup-plutonium');
    if (!decodedToken) {
        res.send({ status: false, data: "token is invalid" });
    } else {
            req["decodedToken"]=decodedToken
        next();
    }
}


const authorise = function (req, res, next) {
    // comapre the logged in user's id and the id in request
    let decodedToken = req.decodedToken;
    let userId = req.params.userId;
    if (decodedToken.userId == userId) {
        next();
    } else {
        return res.send({ status: false, data: "user does not matched" })
    }
}



module.exports.authenticate = authenticate;
module.exports.userLogin = userLogin;
module.exports.verifyToken = verifyToken;
module.exports.authorise = authorise;