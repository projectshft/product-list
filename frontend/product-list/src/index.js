import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";
import { Row, Col, Card, Navbar, Container, Button, Nav } from 'react-bootstrap';

import Header from "./components/header";
import reducers from "./reducers";
import ProductsIndex from "./components/products-index"
import CategoriesList from './components/categories-list';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Header>
        <Container>
          <Row>
            <Col lg={2}>
              <CategoriesList />
            </Col>
            <Col lg={10}>
              <ProductsIndex />
            </Col>
          </Row>
        </Container>
      </Header>
    </BrowserRouter>
   </Provider>,
  document.getElementById('root')
);
