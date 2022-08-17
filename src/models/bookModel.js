const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    BookName: {
        type : String,
        required : true
    },
    prices: {
        indianPrice: String,
        europeanPrice: String,
    },
    year : {type : Number, default : 2021},
    tags: [String],
    authorName: String, 
    // isPublished: Boolean,
    totalPages : Number,
    stockAvailable : Boolean,
    // sales: {type: Number, default: 10}
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover
