const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1/products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors({origin:true,credentials: true}));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});

