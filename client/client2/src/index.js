import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import promise from "redux-promise";
import reducers from "./reducers/rootReducer";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ProductList from './components/productList'
import SearchBar from './components/searchBar'
import Reviews from './components/Reviews'
import Cart from "./components/Cart";


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <SearchBar />
        <Switch>
          <Route exact path='/'  render={() => <Redirect to='/products' />} />
          <Route exact path='/products' component={ProductList} />
          <Route path = '/products/:product' component={Reviews} />
          <Route path='/me/cart' component={Cart} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>

  , document.getElementById('root'));

