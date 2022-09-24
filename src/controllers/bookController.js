const bookModel = require("../models/bookModel");
const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");
const {
  isValidName,
  isValid,
  isValidId,
  isValidISBN,
  isValidReleasedAt,
} = require("../validation/validation");

const createBook = async function (req, res) {
  try {
    let data = req.body;
    const { title, excerpt, userId, ISBN, category, subcategory, releasedAt } =
      data;

    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message: "Data is required for creating book...",
      });
    }
    // userId validtion

    if (!userId)
      return res
        .status(400)
        .send({ status: false, message: "Please enter userId" });

    if (!isValid(userId) || !isValidId(userId))
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid userId" });

    // console.log(req.loginUserId, data.userId);
    if (req.loginUserId != data.userId) {
      return res
        .status(403)
        .send({ status: false, message: "unauthorised user" });
    }

    if (!title || !isValid(title.trim()))
      return res.status(400).send({
        status: false,
        message: "title is required and should be a valid format",
      });

    let checkTitle = await bookModel.findOne({ title: title });
    if (checkTitle)
      return res
        .status(409)
        .send({ status: false, message: `'${title}' is already taken` });

    // excerpt validation

    if (!excerpt || !isValid(excerpt.trim()))
      return res.status(400).send({
        status: false,
        message: "excerpt is required",
      });

    let checkUser = await userModel.findOne({ _id: userId });
    if (!checkUser)
      return res
        .status(400)
        .send({ status: false, message: "User is not present" });

    if (!ISBN)
      return res
        .status(400)
        .send({ status: false, message: "Please enter ISBN" });

    if (!isValid(ISBN) || !isValidISBN(ISBN.trim()))
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid ISBN " });

    let checkISBN = await bookModel.findOne({ ISBN: ISBN });
    if (checkISBN)
      return res.status(400).send({
        status: false,
        message: `ISBN '${req.body.ISBN}' already exist`,
      });

    // category validation
    if (!category)
      return res
        .status(400)
        .send({ status: false, message: "Please enter category" });

    if (!isValidName(category.trim()))
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid Category" });

    // subcategory validation
    if (!subcategory)
      return res
        .status(400)
        .send({ status: false, message: "Please enter subcategory" });

    if (!isValidName(subcategory.trim()))
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid subcategory" });

    // released date validation
    if (!releasedAt)
      return res
        .status(400)
        .send({ status: false, message: "Please enter release date" });

    if (!isValidReleasedAt(releasedAt.trim()))
      return res.status(400).send({
        status: false,
        message: "Please enter valid release date in YYYY-MM-DD format",
      });

    // creating new book
    const savedData = await bookModel.create(req.body);

    // deleteing deletdAt field
    delete savedData._doc["deletedAt"];

    return res
      .status(201)
      .send({ status: true, message: "Sucessfully created", data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

const getBooks = async function (req, res) {
  try {
    let data = req.query;

    if (Object.keys(data).length == 0) {
      let books = await bookModel
        .find({ isDeleted: false })
        .select({
          title: 1,
          excerpt: 1,
          userId: 1,
          category: 1,
          releasedAt: 1,
          reviews: 1,
        })
        .sort({ title: 1 });
      if (Object.keys(books).length == 0) {
        return res
          .status(404)
          .send({ status: false, message: "No Books Found..." });
      }

      // let sortedBooks = books.sort((a, b) => (a.name > b.name ? 1 : -1))
      return res
        .status(200)
        .send({ status: true, message: "Success", data: books });
    }
    //    Destructuring
    const { userId, category, subcategory, releasedAt, reviews } = data;

    if (userId && !isValidId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid User Id..." });
    }

    if (userId) data.userId = userId;
    if (category) data.category = category;
    if (subcategory) data.subcategory = subcategory;
    if (releasedAt) data.releasedAt = releasedAt;
    if (reviews) data.reviews = reviews;

    let filter = {
      ...data,
      isDeleted: false,
    };

    let bookList = await bookModel
      .find(filter)
      .select({
        title: 1,
        excerpt: 1,
        userId: 1,
        category: 1,
        releasedAt: 1,
        reviews: 1,
      })
      .sort({ title: 1 });
    if (Object.keys(bookList).length == 0) {
      return res
        .status(404)
        .send({ status: false, message: "Book Not Found..." });
    }

    return res
      .status(200)
      .send({ status: true, message: "Books list", data: bookList });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getBookById = async function (req, res) {
  try {
    let bookId = req.params.bookId;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: `bookId ${bookId} is invalid` });
    }
    let getSpecificBooks = await bookModel.findOne({
      _id: bookId,
      isDeleted: false,
    });
    if (!getSpecificBooks) {
      return res
        .status(404)
        .send({ status: false, data: "No books can be found" });
    }
    // deleteing deletdAt field
    delete getSpecificBooks._doc["deletedAt"];

    let result = await reviewModel.find({ bookId, isDeleted: false });
    // console.log(result,bookId)
    const details = getSpecificBooks._doc;
    details.reviewsData = result;

    return res
      .status(200)
      .send({ status: true, message: "success", data: details });
  } catch (error) {
    res.status(500).send({ status: false, err: error.message });
  }
};

const updateBooks = async function (req, res) {
  try {
    let requestBody = req.body;
    let bookId = req.params.bookId;

    if (Object.keys(requestBody) == 0) {
      return res.status(400).send({
        status: false,
        message: "Data is required for updating book...",
      });
    }

    // if (req.loginUserId != requestBody.userId) {
    //     return res
    //       .status(403)
    //       .send({ status: false, message: "unauthorised user" });
    //   }

    if (bookId && !isValidId(bookId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid Book Id..." });
    }
    // Destructuring
    const { title, excerpt, releasedAt, ISBN, userId } = requestBody;
    let validBookId = await bookModel
      .findOne({ _id: bookId, isDeleted: false })
      .select({ userId: 1, _id: 0 });

    if(!validBookId){
        return res
        .status(404)
        .send({ status: false, message: "book not found" });
    }
    // console.log(validUserId);
    if (req.loginUserId != validBookId.userId) {
      return res
        .status(403)
        .send({ status: false, message: "unauthorised user" });
    }
    // title validation
    //if (title) {
     if(userId && req.loginUserId != userId){
        return res
        .status(403)
        .send({ status: false, message: "unauthorised user" });
     }

    if (userId && !isValidId(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "user id must be valid" });
    }
    if (title && !isValid(title.trim()))
      return res.status(400).send({
        status: false,
        message: "title  should be in valid format...",
      });
    let checkTitle = await bookModel.findOne({
      title: title,
      isDeleted: false,
    });
    if (checkTitle)
      return res
        .status(409)
        .send({ status: false, message: `${title}' is already taken...` });
    //}
    //excerpt validation
    //if (excerpt) {
    if (excerpt && !isValid(excerpt.trim()))
      return res.status(400).send({
        status: false,
        message: "excerpt should be in a valid format...",
      });
    //}
    // releasedAt validation
    // if (releasedAt) {
    if (releasedAt && !isValidReleasedAt(releasedAt.trim()))
      return res.status(400).send({
        status: false,
        message: "Please enter valid release date in YYYY-MM-DD format...",
      });
    // }
    // ISBN validation
    // if (ISBN) {
    if (ISBN && !isValidISBN(ISBN))
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid ISBN... " });

    let checkISBN = await bookModel.findOne({ ISBN: ISBN, isDeleted: false });
    if (checkISBN)
      return res.status(409).send({
        status: false,
        message: `ISBN '${req.body.ISBN}' already exists...`,
      });

    // }

    let updateBody = {};

    if (title) {
      updateBody.title = title;
    }
    if (excerpt) {
      updateBody.excerpt = excerpt;
    }
    if (releasedAt) {
      updateBody.releasedAt = releasedAt;
    }
    if (ISBN) {
      updateBody.ISBN = ISBN;
    }

    let updatedBook = await bookModel.findOneAndUpdate(
      {  bookId, isDeleted: false },
      { $set: updateBody },
      { new: true }
    );
    if (!updatedBook) {
      return res
        .status(400)
        .send({ status: false, message: "Enter Valid Updates..." });
    }
    
     // deleteing deletdAt field
     delete updatedBook._doc["deletedAt"];

    return res
      .status(200)
      .send({ status: true, message: "Success", data: updatedBook });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteBook = async function (req, res) {
  try {
    let bookId = req.params.bookId;
    //check blogId valid
    let validUserId = await bookModel
      .findById({ _id: bookId, isDeleted: false })
      .select({ userId: 1, _id: 0 });
    console.log(validUserId, req.loginUserId, bookId);
    if (req.loginUserId != validUserId.userId) {
      return res
        .status(403)
        .send({ status: false, message: "unauthorised user" });
    }

    if (!isValidId(bookId))
      return res.status(400).send({ status: false, message: "Invalid bookId" });

    let savedData = await bookModel.findById(bookId);

    //if it is already deleted

    if (savedData.isDeleted)
      return res.status(404).send({
        status: false,
        message: "Book not found",
      });

     await bookModel.findByIdAndUpdate(
      savedData,
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { new: true }
    );
     return res.status(200).send({ status: true, message: "deleted successfully" });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createBook, getBooks, getBookById, updateBooks, deleteBook };
