const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    title : {
        type : String,
        required : true,
        unique : true,
        min : 3,
        max : 30,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
});

module.exports = mongoose.model("category", CategorySchema)