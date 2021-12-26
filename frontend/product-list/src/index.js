import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import promise from "redux-promise";
import { Container } from 'react-bootstrap';
import Products from "./components/products";
import ProductDetail from "./components/product-detail";
import NewProduct from './components/product-new';
import Header from "./components/header";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Header>
        <Container>
          <Routes>
            <Route path="/products" element = {<Products />} />
            <Route path="/products/:id" element = {<ProductDetail />} />
            <Route path="/products/new" element = {<NewProduct />} />
          </Routes>
        </Container>
      </Header>
    </BrowserRouter>
   </Provider>,
  document.getElementById('root')
);
