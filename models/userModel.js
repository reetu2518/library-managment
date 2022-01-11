const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    mobileNumber : {
        type : Number,
        required : true
    },
    profilePic : {
        type : String
    },
    roleType : {
        type : String,
        enum : ['User','Admin', 'Librarian'],
        default : "User",
        required : true
    },
    status : {
        type : Boolean,
        required : true,
        default : 1,
        comments: [{body:"string", by: "1 : Active, 0: deactive"}],
    },
    accessToken : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
        required : true
    },
    updatedAt : {
        type : Date,
    },
});

// model->1st parameter collection name
const User = mongoose.model("users", userSchema);
module.exports = User;