const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const mongoDB = 'mongodb://localhost/myProducts';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

//// NEED TO FIGURE OUT EJS AND WHAT TO PASS IN RES.RENDER??
//app.set('view engine', 'ejs'); 
//app.set('views', path.join(__dirname, '/templates/views'))        //???????

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));  //rendered 'I'm working'
});

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

const mainRoutes = require("./routes/main");
app.use(mainRoutes);

app.use(handleRender)

function handleRender(req, ers) {

}
function renderInitialPage(html, preloadedState) {

}

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});