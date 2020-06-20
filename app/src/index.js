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
        <h1 className="text-center">PRODUCTS</h1>
        <SearchFilterSortBar />
        <ProductContainer products={this.props.products} />
        <PaginationComponent products={this.props.products} />
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
      <form className="form-inline">
        {/* <div class="form-row"> */}
        <label className="ml-2 mr-2" htmlFor="exampleFormControlInput1">Search</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search..." />
        <label className="ml-2 mr-2" htmlFor="inlineFormCustomSelectCategory">Filter by Category: </label>
        <select className="form-control custom-select" id="inlineFormCustomSelectCategory">
          {/* <option defaultValue="Toys">Toys</option> */}
          <option value="Home">Home</option>
          <option value="Baby">Baby</option>
          <option value="Garden">Garden</option>
        </select>
        <label className="ml-2 mr-2" htmlFor="inlineFormCustomSelectSort">Sort by Price: </label>
        <select className="form-control custom-select" htmlFor="inlineFormCustomSelectSort">
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
class ProductContainer extends React.Component {


  renderProducts(products) {
    // products.map(products)
    console.log('products in renderProducts function:', products)

    // const name = cityData.city.name;
    // const temps = cityData.list.map(weather => weather.main.temp);
    // const pressures = cityData.list.map(weather => weather.main.pressure);
    // const humidities = cityData.list.map(weather => weather.main.humidity);
    // console.log(temps,pressures,humidities)
    return (
      <div>
        <div class="row">
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
        </div>
        <div class="row">
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
        </div>
        <div class="row">
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
        </div>
      </div>
    );

  }


  render() {
    const products = this.props.products;

    return (
      <div>
        {this.renderProducts(products)}
      </div>
    );
  }
}

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
class IndividualProductDiv extends React.Component {
  render() {
    let products = this.props.products;
    let url = products[0].img
    return (
      <div className="col-md-4">
        <div>
          <div>{products[0].category}{products[0].price}</div>
          <div><img src={url}></img></div>
          <div>{products[0].name}</div>
        </div>
      </div>
    )
  }
}


class PaginationComponent extends React.Component {

  renderPages(count) {
    if (count <= 9 ) {
      return <div className="col-md-2 pages"><span> className="col-md-2"1</span></div>
    } else if (count <= 18) {
      return <div className="col-md-2 pages"><span className="col-md-2 pages">1</span><span className="col-md-2 pages">2</span></div>
    } else if (count <= 27) {
      return <div className="col-md-2 pages"><span className="col-md-2 pages">1</span><span className="col-md-2 pages">2</span><span className="col-md-2">3</span></div>
    } else {
      return <div><span>Need more pages</span></div>
    }
    
  }

  render() {
    const products = this.props.products;
    const count = products.length;
    return(
      <div className="row text-center">{this.renderPages(20)}</div>
    )
  }
}


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


