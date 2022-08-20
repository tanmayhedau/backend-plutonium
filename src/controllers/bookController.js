const mongoose = require('mongoose')
const AuthorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const PublisherModel = require("../models/publisherModel")
//====================================================================================================================
const createBook= async function (req, res) {
       let book = req.body 
       let myAuthor =book.author
       let myPublisher =book.publisher
       let isValidAuthor = mongoose.Types.ObjectId.isValid(myAuthor)
       let isValidPublisher = mongoose.Types.ObjectId.isValid(myPublisher) 

       if(isValidAuthor===false && isValidPublisher===false){
        return res.send("not a valid AuthorId and publisherId")
       }else if(isValidPublisher===false){
        return res.send("not a valid PublisherId")
       }else if(isValidAuthor===false){
        return res.send("not a valid AuthorId ") 
       }

       let authorId = await AuthorModel.findById(myAuthor)
       let publisherId = await PublisherModel.findById(myPublisher) 

       if(!authorId && !publisherId){
        return res.send("authorID and publisherID both are not matching")
       }else if(!publisherId){
        return res.send("publisherID is not matching")
       }else if(!authorId){ 
        return res.send("authorID is not matching")
       }else {
        let bookCreated = await bookModel.create(book)
         return res.send({data:bookCreated})
       }
}
//==================================================================================================================
const getBooksData =async function (req,res){
 let books = await bookModel.find().populate('author').populate('publisher')
 res.send({data:books})
}
//=================================================================================================================
const books =async function (req,res){
    // let details=await bookModel.find().populate({path:'publisher',match:{$or:[{name:"Penguin"} ,{name:"HarperCollins"}]}})
    let detail = await PublisherModel.find({name:['Penguin', 'HarperCollins']}).select({_id:1})
    let books = await bookModel.updateMany({publisher:detail},{$set:{ isHardCover:true, new: true}})
    res.send({data:books})
} 
//================================================================================================================
 const getBooksWithAuthorDetails= async function (req,res){
    let details = await AuthorModel.find({rating:{$gt:3.5}}).select({_id:1})
    let books = await bookModel.updateMany({author:details},{$inc:{price:10}})
    res.send({data:books})
 }
//================================================================================================================


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.books=books
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
