import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import App from './components/app'
import ProductList from './containers/productList'
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import IndexCSS from './index.css'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
     <div>
      <Switch>
        <Route exact path='/' component = {App}></Route>
        <Route exact path='/products' component = {ProductList}></Route>
       </Switch>
      </div>
    </BrowserRouter>
   </Provider>,
  document.getElementById('root')
);
