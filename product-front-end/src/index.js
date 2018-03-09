import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/header';
import Main from './components/page-view';
import Footer from './components/footer';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import rootReducers from "./reducers";
import 'bootstrap/dist/css/bootstrap.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducers)}>
    {/* <BrowserRouter> */}
    <div>
      <Header />
      <Main />
      <Footer />
      {/* <Switch>
          <Route exact path="/" component={page-view} />
          <Route path="/test" component={Test} />
          <Route path="/day" component={SingleMeal} />
          <Route path="/:id" component={MealRecipe} />
          <Route path="/" component={HomePage} />
      </Switch> */}
    </div>
    {/* </BrowserRouter> */}
  </Provider>,
  document.getElementById('root')
);
