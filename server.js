const express = require("express")
const app = express()
const PORT = 6000
const db = require("./config/db")
const routes = require("./routes/route")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const port = process.env.PORT || 6000;
app.use(express.static(__dirname + '/public'));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
app.listen(port, console.log("server running at port => "+ port))