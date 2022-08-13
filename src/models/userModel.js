const mongoose = require('mongoose');
// const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  firstName:  String, // String is shorthand for {type: String}
  lastNmame: String,
  mobile:{
           type : String,
           unique : true,
           required : true
  },
  emailId : String,
  gender : {
            type : String,
            enum : ["male", "female", "lgbtq"] // falana will give error
  },
  age : Number,
  isIndian : Boolean,
  parenstInfo : {
    motherName : String,
    fatherName : String,
    siblingNAame : String
  },
  cars : [String]
  }, {timestamps : true});
module.exports = mongoose.model('User' , userSchema) // users in mongodb


//string ,number, boolean, json, array