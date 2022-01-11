const mongoose = require("mongoose")
const URL = "mongodb://localhost:27017/library_managment";

mongoose.connect(URL).then(() => {
    console.log("Database connected!");
});