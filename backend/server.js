const express = require('express')
const cors = require('cors');


const app = express();

const corsOptions = {
  origin: "https://localhost:8000"
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
