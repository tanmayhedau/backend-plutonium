const { count } = require("console")
const BooksModel= require("../models/booksModel")
const AuthorsModel = require("../models/authorsModel")
// ==============================================================================================================================
const createAuthors= async function (req,res) {
    let data = req.body

    let savedData = await AuthorsModel.create(data)
    res.send({msg: savedData})
}
const createBooks= async function (req, res) {
    let data= req.body

    let savedData= await BooksModel.create(data)
    res.send({msg: savedData})
}
// ===============================================================================================================================
const getBooksData= async function (req,res) {
    let allBooks= await AuthorsModel.findOne({author_name : "Chetan Bhagat"}).select({author_id: 1, _id:0})
    console.log(allBooks);
    let list = await BooksModel.find(allBooks)
    res.send({msg:list})
}
//==================================================================================================================================
const getAuthorsName= async function (req,res){
    let allAuthors = await BooksModel.findOneAndUpdate({name : "Two states"} ,{$set : {price: 100}},{new:true})
    console.log(allAuthors);
    let getAuthors = await AuthorsModel.findOne({author_id: allAuthors.author_id}).select({author_name: 1, _id:0})
    res.send({msg: allAuthors, author_name : getAuthors.author_name})
    // let author = await AuthorsModel.find()

}

//====================================================================================================================================

const getAuthorsByPrice = async function (req,res){
    let allAuthors = await BooksModel.find({price:{$gte:50,$lte:100}})
    let result = allAuthors.map(x=>x.author_id)
    let newAllAuthors = await AuthorsModel.find({author_id:result}).select({author_name:1,_id:0});
    // let result = [];
    // for(let i = 0; i<allAuthors.length; i++){
    //     let output = await AuthorsModel.findOne(allAuthors[i]).select({author_name:1,_id:0});
    //     result.push(output.author_name)
    // } 
    res.send({msg: newAllAuthors});
}
//======================================================================================================================================
// const getBooksData= async function (req, res) {
//     let allBooks= await BooksModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


const updateBooks= async function (req, res) {
    let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    let allBooks= await BookModel.findOneAndUpdate( 
        { authorName: "ABC"} , //condition
        { $set: data }, //update in data
        { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
     )
     
     res.send( { msg: allBooks})
}

const deleteBooks= async function (req, res) {
    // let data = req.body 
    let allBooks= await BookModel.updateMany( 
        { authorName: "FI"} , //condition
        { $set: {isDeleted: true} }, //update in data
        { new: true } ,
     )
     
     res.send( { msg: allBooks})
}




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE




module.exports.getAuthorsByPrice =getAuthorsByPrice 
module.exports.getAuthorsName=getAuthorsName
module.exports.createAuthors=createAuthors
module.exports.createBooks= createBooks 
module.exports.getBooksData= getBooksData
module.exports.updateBooks= updateBooks
module.exports.deleteBooks= deleteBooks
