import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import promise from 'redux-promise';

// import VotePage from './components/VotePage';
// import FinalResult from './components/FinalResult';

import 'bootstrap/dist/css/bootstrap.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);


ReactDOM.render((
<Provider store={createStoreWithMiddleware(reducers)}>
  <BrowserRouter>
    <Switch>
      <Route exact path='/products' component={App}/>
      <Redirect from='/' to='/products'/>
    </Switch>
  </BrowserRouter>
  </Provider>
), document.getElementById('root'));
