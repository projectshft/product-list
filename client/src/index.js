import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import promise from 'redux-promise';


import 'bootstrap/dist/css/bootstrap.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers, composeWithDevTools())}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/products' component={App} />
        <Redirect from='/' to='/products' />
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));

