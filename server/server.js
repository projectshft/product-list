const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({extended: true}));
app.use(cors());



const mainRoutes = require("./routes/main");
app.use(mainRoutes);

mongoose.connect("mongodb://localhost/products", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() =>app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((err) => console.log(err.message))

