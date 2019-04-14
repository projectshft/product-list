const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// A Connect/Express middleware that can be used to enable CORS
// const cors = require('cors');

// const CORS_HEADERS = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers':
//     'Origin, X-Requested-With, Content-Type, Accept, X-Authentication'
// };
// import { log } from "console"

// // Chalk for colorful logs
// import chalk from "chalk"

mongoose.connect('mongodb://localhost/products');

const app = express();
// Enable *All* CORS Requests:
// app.use(cors());

// body-parser config
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Pre-flight request // SEE BELOW
// app.use((request, response, next) => {
//   response.header('Access-Control-Allow-Origin', '*');
//   response.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, X-Authentication'
//   );
//   if (request.method == 'OPTIONS') {
//     return response.status(200).send();
//   }
//   // next(); // ???
// });

const mainRoutes = require('./routes/main');

app.use(mainRoutes);

// app.post('/post/data', function(request, response) {
//   console.log('receiving data...');
//   console.log('body is ',request.body);
//   response.send(request.body);
// });
const port = process.env.PORT || 8000;

// app.listen(port, () =>
//   log(chalk.greenBright(`Server started on port: ${port}`))
// );
app.listen(port, () => {
  console.log(
    `Server started. Node.js is listening at http://localhost:${port}`
  );
});

// module.exports = app;

/*
************************************************** 
Compound launch options in VSCode, for debugging
(from Sean)
***************************************************/
// "configurations": [
//   {
//       "type": "node",
//       "request": "launch",
//       "name": "Server",
//       ....
//   },
// {
//       "type": "node",
//       "request": "launch",
//       "name": "Client",
//       ....
//   }
// ],
// "compounds": [
//   {
//       "name": "Server/Client",
//       "configurations": ["Server", "Client"]
//   }
// ]

/******************
 * FROM NPM CORS:
 * ***************/
// Enabling CORS Pre-Flight
// Certain CORS requests are considered 'complex' and require an initial OPTIONS request (called the "pre-flight request"). An example of a 'complex' CORS request is one that uses an HTTP verb other than GET/HEAD/POST (such as DELETE) or that uses custom headers. To enable pre-flighting, you must add a new OPTIONS handler for the route you want to support:

// var express = require('express')
// var cors = require('cors')
// var app = express()

// app.options('/products/:id', cors()) // enable pre-flight request for DELETE request
// app.del('/products/:id', cors(), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })
// You can also enable pre-flight across-the-board like so:

// app.options('*', cors()) // include before other routes
