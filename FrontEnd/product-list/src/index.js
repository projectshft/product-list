import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import reducers from "./reducers/index";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import ProductList from './components/products.js';
import CategoryandSortDropdowns from './components/dropdowns.js';
import SearchBar from './components/searchBar';
import 'bootstrap/dist/css/bootstrap.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore); 

ReactDOM.render(
    <Provider store= {createStoreWithMiddleware(reducers)}>
        <div>
        <Container>
            <Row>
                <SearchBar/>
                <CategoryandSortDropdowns/>
            </Row>
            <ProductList/>
        </Container>
        </div>
    </Provider>,
document.getElementById("root"));