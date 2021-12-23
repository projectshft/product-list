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
import ProductDetail from "./components/product-detail"
import Header from "./components/header";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Header>
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path="/products" element = {<Products />} />
            <Route path="/products/:id" element = {<ProductDetail />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Header>
   </Provider>,
  document.getElementById('root')
);
