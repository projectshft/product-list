//To Connect to both the Server and Client sides simultaneously, you need to run node server.js for the whole folder(server) and npm start for the client folder, in two different terminals. 
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');

//The mongoose that is defined above, connects below to the localhost.
mongoose.connect('mongodb://localhost/products')

//The constant app uses express which is defined above at the very top. It also uses bodyParser that is also defined above, to connect back to json objects as well as the url encoded links.
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//The app also uses cors, defined above which will connect the server and client sides of the code. 
app.use(cors());
//The main routes are defined below and will also be used by app as well. 
const mainRoutes = require('./routes/main')

app.use(mainRoutes)
//The server side code will be implemented below on port 8000. 
app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})