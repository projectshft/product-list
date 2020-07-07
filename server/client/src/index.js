import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';
import MainPage from './components/main-page';
import reducers from './reducers';





/* we've installed redux-promise and applyMiddleware that comes built in with redux. Here
 we're enhancing our store with the middleware, that will ensure the reducer isn't called
 until the api returns with the data (the promise is fulfilled). applyMiddleware is a
 function that when invoked returns another function. We then invoke that function to
 create the store. Then in the Provider below, when we actually create the store, it will
 have the functionality to wait to call the reducer to update our store until the api
 returns. (side note: nothing will dispatch if the promise is rejected)
*/
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

/* Here is where instantiate our MainPage (top level component) with Redux and create our
   store and wire up our store/reducers with our App
*/
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MainPage className="main" />
  </Provider>,
  document.getElementById('root')
);

















