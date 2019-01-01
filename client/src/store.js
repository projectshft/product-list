import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index'

const createStore = (rootReducer) => {
  let state = {
  totalProducts: [],
  productsToDisplay: [],
  categories: [],
  page: 1,
  count : 0,
  sorted: null,
  category: 'None'
  }

  let listeners = [];

  const getState = () => state;


  const dispatch = (action) => {
    state = rootReducer(state, action);
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  }

  dispatch({})

  return {getState, dispatch, subscribe}
}
// const middleware = []

// const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;