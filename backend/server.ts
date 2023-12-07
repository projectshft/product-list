import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import mainRoutes from "./routes/main.js";

// Entry point for server connection

mongoose.connect("mongodb://localhost/products");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(mainRoutes);

const port = 8000;

app.listen(port, () => {
  console.log(`Node.js listening on port ${port}`);
});
