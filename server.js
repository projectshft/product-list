const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoErrResponder = require("./middleware/mongoErrResponder");
const errLogger = require('./middleware/errLogger');
const failSafeHandler = require("./middleware/failSafeHandler");
const cors = require("cors");
const mainRoutes = require("./routes/main");
const app = express();
mongoose.connect("mongodb://localhost/products");



app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

//handle required paths:
app.use(mainRoutes);
//log errors
app.use(errLogger);
//handle mongooose generated errors
app.use(mongoErrResponder);
//handle remaining errors
app.use(failSafeHandler);
app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});