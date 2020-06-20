import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';
import reducers from './reducers';
import MainPage from './components/main-page'

//we've installed redux-promise and applyMiddleware comes built in with redux. Here we're enhancing our store with the middleware, that will ensure the reducer isn't called until the api returns with the data (the promise is fulfilled). applyMiddleware is a function that when invoked returns another function. We then invoke that function to create the store. Then in the Provider below, when we actually create the store, it will have the functionality to wait call the reducer to update our store until the api returns. (side note: nothing will dispatch if the promise is rejected)

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

// PHASE 1
// Notes from "Thinking in React" documentation: https://reactjs.org/docs/thinking-in-react.html
// start by building a static version of the app here in src/index.js 
// don't use state yet for static version as state is for interactivity
// we want to build components that reuse other components and pass data using props
// these components will only have render methods for the static version
// we will build in a top-down down approach (start with the components higher in our hierarchy)
// the top most component will receive the data model as a prop and pass down to child components
// after building the static version we will deal with state, redux, separation of components
// Phase 1 complete

// PHASE 2
// Our states will be search input by the user, category chosen by the user, and maybe the sort filter
// Add in event handlers for search bar, category selection and sort choice
// Add in redux to handle action dispatches, reducer function, store (current data based on page load or user interaction)
// Add in mapStateToProps to re-render based on change in store




// temporary data (that mocks our real db data) that we can work with to test static version of app
const PRODUCTS = [
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0 },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0 },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0 },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0 },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0 },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0 },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0 },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0 },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0 }
];

//Here is where instantiate our App with Redux and create our store and wire up our store/reducers with our App
// uncomment when ready to work with redux
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MainPage products={PRODUCTS} />
  </Provider>,
  document.getElementById('root')
);







// renderRows(products) {
//   //console.log('products in product list', product)
//   const name = product.name;
//   const category = product.category;
//   const imgUrl = product.image;
//   const price = product.price;
//   // console.log(name, category, imgUrl, price)
//   for (let i = 0; i < products.length; i++) {
//     let rowProducts = [];
//     for (let j = 0; j < 3; j++) {
//       rowProducts.push(products[i])
//     }

//   }
//   return (
//     <tr>
//       <ProductRow products={this.productsArray} />
//     </tr>
//   );
// }


// const rows = [];
// const rowProductArray = [];
// //const productsCopy = this.props.products.slice();
// console.log(this.props.products)  //this is an array of all our product objects
// //console.log(productsCopy)
// this.props.products.forEach((product, index) => {
//   const testObj = { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0 }

//   //const clonedProduct = Object.assign({}, product)
//   //console.log('Cloned product:', clonedProduct);
//   rowProductArray.push(product);
//   //console.log('log product by index', rowProductArray[0])
//   //console.log('Row product array', rowProductArray);
//   if (index === 2 || index === 5 || index === 8) {
//     rows.push(<ProductRow rowProducts={rowProductArray} key={index} />);
//     rowProductArray.length = 0;
//   }
// })
// console.log('rows', rows[0])



// console.log(rows);






// class ProductRow extends React.Component {

//   render() {
//     const cells = [];
//     let productsRowArray = this.props.rowProducts;
//     console.log(this.props.rowProducts)
//     productsRowArray.forEach(product => {
//       cells.push(
//         <ProductTableCell product={product} key={product._id} />
//       )
//     })

//     return (
//       <tr>{cells}</tr>
//     );
//   }
// }

// class ProductTableCell extends React.Component {
//   render() {
//     const product = this.props.product;
//     const price = product.price;
//     const category = product.category;
//     const imgUrl = product.image;
//     const name = product.name;

//     return (
//       <td>
//         {name}
//       </td>
//     );
//   }
// }




