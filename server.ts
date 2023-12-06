import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";

import mainRoutes from "./routes/main.js";

// Entry point for server connection

mongoose.connect("mongodb://localhost/products");

const app = express();

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
