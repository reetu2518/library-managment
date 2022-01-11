const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bookBorrowSchema = new Schema({
    bookId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "books",
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "users",
    },
    quantity : {
        type : Number,
        required : true,
    },
    borrowDate : {
        type : Date,
        default : Date.now
    },
    returnDate : {
        type : Date,
        required : true,
    },
    status : {
        type : String,
        enum : ['AVAILABLE', 'BORROWED', 'OVERDUE'],
        default : 'AVAILABLE',
    },
});

module.exports = mongoose.model("bookBorrow", bookBorrowSchema)