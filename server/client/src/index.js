import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';
import MainPage from './components/main-page';
import reducers from './reducers';





// PHASE 1
// Notes from "Thinking in React" documentation: https://reactjs.org/docs/thinking-in-react.html
// start by building a static version of the app here in src/index.js 
// don't use state yet for static version as state is for interactivity
// we want to build components that reuse other components and pass data using props
// these components will only have render methods for the static version
// we will build in a top-down down approach (start with the components higher in our hierarchy)
// the top most component will receive the data model as a prop and pass down to child components
// after building the static version we will deal with state, redux, separation of components
// Phase 1 complete

// PHASE 2
// Our states will be search input by the user, category chosen by the user, and maybe the sort filter
// Add in event handlers for search bar, category selection and sort choice
// Add in redux to handle action dispatches, reducer function, store (current data based on page load or user interaction)
// Add in mapStateToProps to re-render based on change in store



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

















