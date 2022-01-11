// const { response } = require("express");
const Book = require("../models/bookModel");
// const common = require("../helpers/commonController");

/**
 * @description: Book Add
 */
exports.bookAdd = async (req, res, next) => {
  try {
    let title = req.body.title;
    let categoryId = req.body.categoryId;
    let isbn = req.body.isbn;
    let author = req.body.author;
    const newRecord = new Book({
      title: title,
      isbn: isbn,
      categoryId: categoryId,
      author: author,
    });
    newRecord
      .save()
      .then(() => {
        res.status(200).send({
          status: 200,
          message: "Record Saved to database",
        });
      })
      .catch((error) => {
        res.status(400).send({
          status: 400,
          message: "unable to save to database" + error,
        });
      });
  } catch (error) {
    next(error);
  }
};

/**
 * @description: Fetch All books here
 */
exports.booksFetch = async (req, res, next) => {
  try {
    Book.find()
      .populate("categoryId")
      .then((response) => {
        if (response == null) {
          res.status(400).send({
            status: 400,
            message: "No record found" + err,
          });
        }
        res.status(200).send({
          status: 200,
          message: "All Records!",
          records: response,
        });
      })
      .catch((err) => {
        console.log("fetch error", err);
      });
  } catch (error) {
    next(error);
  }
};

/**
 * @description: Fetch book By Id
 */
exports.bookFetchById = async (req, res, next) => {
  try {
    let id = req.params["id"];
    Book.findById(id)
      .populate("categoryId")
      .exec()
      .then((result) => {
        res.status(200).send({
          status: 200,
          message: "Record Fetch Sucessfully!",
          records: result,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  } catch (error) {
    console.log(error, "==>error");
  }
};

/**
 * @description: Sorted Records
 */
exports.booksSorted = async (req, res, next) => {
  try {
    // 1 -> Asc, -1 -> desc
    let sortOrder = req.params["order"];
    Book.find()
      .populate("categoryId")
      .sort({ title: sortOrder })
      .exec(function (err, result) {
        if (err) {
          res.status(400).send({
            status: 400,
            message: "No record found" + err,
          });
        }
        res.status(200).send({
          status: 200,
          message: "All Records!",
          records: result,
        });
      });
  } catch (error) {
    next(error);
  }
};

/**
 * @description: Records Search by title or author name
 */
exports.searchBookByTitle = async (req, res, next) => {
  try {
    let keyword = req.query.keyword;
    let query;
    query = Book.find(
      {
        $or: [
          { title: { $eq: keyword } },
          { author: { $eq: keyword } },
        ],
      }
    );
    query.populate("categoryId").exec((err, result) => {
      if (err) {
        res.status(400).send({
          status: 400,
          message: "No record found" + err,
        });
      }
      res.status(200).send({
        status: 200,
        message: "Record found!",
        records: result,
      });
    });
  } catch (error) {
    next(error);
  }
};
