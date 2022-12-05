const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config({path: "./config.env"})

const productRoutes = require('./routes/products')

const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:5173"
}

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use('/api/products', productRoutes)


mongoose.connect(process.env.LOCAL_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err);
  })

