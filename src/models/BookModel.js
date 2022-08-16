const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema( {
    BookName:{
        type: String,
        unique: true,
        required: true
    },
    AuthorName: {
        type : String,
        required: true
    },
    Category:{
        type : String,
        required: true,
        enum: ["ScienceFiction", "English","maths"]
    },
    Year:Number,
    Tags : [String],
    IsPublished : Boolean,
    Prices : {
        IndianPrices : String,
        EuropeanPrices : String 
    },
    Sales : {
        type : Number,
        default : 15
    },
        
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema) //books
