const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title : {
        type : String,
        required : true,
        min : 3,
        max : 50,

    },
    isbn : {
        type : Number,
        required : true,
        unique : true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "category",
        comments: [{body:"string", by: mongoose.Schema.Types.ObjectId}],
    },
    author : {
        type : String,
        required : true,
        min : 3,
        max : 30,
    },
    status : {
        type : String,
        enum : ['AVAILABLE', 'BORROWED', 'OVERDUE'],
        default : 'AVAILABLE',
    },
    quantity : {
        type : Number,
        default : 10,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
});

module.exports = mongoose.model("books", BookSchema)