// src/redux/reducers/productsReducer.js

const initialState = {
  products: [],
  selectedProduct: null,
  // other state properties if needed
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Define your action types and update state accordingly
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    case 'SET_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
