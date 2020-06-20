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


class MainPage extends React.Component {
  render() {
    return (
      <div>
        <SearchFilterSortBar />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}

//dropdowns can be a button if needed
/*another option if needed:
        <div class="dropdown-menu">
          <h6 class="dropdown-header">Dropdown header</h6>
          <a class="dropdown-item" href="#">Action</a> 
          <a class="dropdown-item" href="#">Another action</a>
        </div>

From bootstrap docs:
Form controls
Textual form controls—like <input>s, <select>s, and <textarea>s—are styled with the .form-control class. Included are styles for general appearance, focus state, sizing, and more.
Be sure to explore our custom forms to further style <select>s.  

Where do we make our row? another outer div with class="row"?
 */
class SearchFilterSortBar extends React.Component {
  render() {
    return (
      <form class="form-inline">
        {/* <div class="form-row"> */}
          <label class="ml-2 mr-2" for="exampleFormControlInput1">Search</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Search..." />
          <label class="ml-2 mr-2" for="inlineFormCustomSelectCategory">Filter by Category: </label>
          <select class="form-control custom-select" id="inlineFormCustomSelectCategory">
            <option selected>Category</option>
            <option value="Home">Home</option>
            <option value="Baby">Baby</option>
            <option value="Garden">Garden</option>
          </select>
          <label class="ml-2 mr-2" for="inlineFormCustomSelectSort">Sort by Price: </label>
          <select class="form-control custom-select" for="inlineFormCustomSelectSort">
            <option selected>Sort Type</option>
            <option value="Highest">Price: Low to High</option>
            <option value="Lowest">Price: High to Low</option>
          </select>
        {/* </div> */}
      </form>
    );
  }
}

//this will be the outer table component that holds our product rows and products
//the products are passed down as props so we can access them in this component. Each row will be passed a product as a prop and the product's id will be used a the key (react requirement)
class ProductTable extends React.Component {
  render() {
    const rows = [];
    
    this.props.products.forEach((product) => {
      rows.push(
        <ProductRow
          product={product}
          key={product._id} />
      );
    });

    return (
      <table>
        {/* <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead> */}
        <tbody>{rows}</tbody>
      </table>
    );
  }
}


class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const price = product.price;
    const category = product.category;
    const img = product.img;
    const name = product.name;

    return (
      <tr>
        <td>{name}</td>
      </tr>
    );
  }
}

// temporary data (that mocks our real db data) that we can work with to test static version of app
const PRODUCTS = [
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0, reviews: [{ _id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome' }] },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0, reviews: [{ _id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome' }] },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0, reviews: [{ _id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome' }] },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0, reviews: [{ _id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome' }] },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0, reviews: [{ _id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome' }] },
  { _id: '5eed0c1f27079b4398415858', category: 'Home', name: 'Incredible Metal Mouse', price: 432, img: 'https://via.placeholder.com/250?text=Product+Image', _v: 0, reviews: [{ _id: '5eed0c1f27079b4398415859', username: 'Ludie Greenholt', text: 'This Incredible Metal Mouse is awesome' }] }
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


