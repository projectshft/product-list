import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';
//import App from './components/app';
import reducers from './reducers';

//we've installed redux-promise and applyMiddleware comes built in with redux. Here we're enhancing our store with the middleware, that will ensure the reducer isn't called until the api returns with the data (the promise is fulfilled). applyMiddleware is a function that when invoked returns another function. We then invoke that function to create the store. Then in the Provider below, when we actually create the store, it will have the functionality to wait call the reducer to update our store until the api returns. (side note: nothing will dispatch if the promise is rejected)

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


// Notes from "Thinking in React" documentation: https://reactjs.org/docs/thinking-in-react.html
// start by building a static version of the app here in src/index.js 
// don't use state yet for static version as state is for interactivity
// we want to build components that reuse other components and pass data using props
// these components will only have render methods for the static version
// we will build in a top-down down approach (start with the components higher in our hierarchy)
// the top most component will receive the data model as a prop and pass down to child components
// after building the static version we will deal with state, redux, separation of components




// temporary data (that mocks our real db data) that we can work with to test static version of app
const PRODUCTS = [
  {_id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', reviews: [{_id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome'}]},
  {_id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', reviews: [{_id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome'}]},
  {_id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', reviews: [{_id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome'}]},
  {_id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', reviews: [{_id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome'}]},
  {_id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', reviews: [{_id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome'}]},
  {_id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', reviews: [{_id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome'}]}
];

//Here is where instantiate our App with Redux and create our store and wire up our store/reducers with our App
// uncomment when ready to work with redux
// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <MainPage products={PRODUCTS} />,
  document.getElementById('root')
);


