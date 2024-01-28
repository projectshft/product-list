## Product List

How to run this project locally:
Make sure you have NodeJS and mongodb installed.

Clone my repo and run npm install. This will take care of the following dependencies:  
 {"body-parser": "^1.20.2",
"cors": "^2.8.5",
"express": "^4.18.2",
"faker": "^6.6.6",
"mongoose": "^8.0.2"}

You'll need to create a mongo database. Fire up a mongodb server (mongod command, once you have installed MongoDB), open a new terminal tab and run mongosh to access the shell. Run command 'use products' to create a products database.

Then open the cloned repo in a code editor and run 'node server'. This will start the backend server on localhost:8000.

To generate fake data to full the inventory, make a GET request to http://localhost:8000/generate-fake-data. This will generate 90 fake products, with 20 reviews each. You may make multiple of these requests to fill your database.

Then cd into product-list-frontend and run npm start. This will open the frontend and it should be working!

This project has been created by a student at Parsity, an online software engineering course. The work in this repository is wholly of the student based on a sample starter project that can be accessed by looking at the repository that this project forks.

If you have any questions about this project or the program in general, visit [parsity.io](https://parsity.io/) or email hello@parsity.io.
