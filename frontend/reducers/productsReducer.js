import { FETCH_PRODUCTS } from "../actions";

const defaultState = {
  products: []
}

const cleanProducts = (products) => {
  return {
    products: products.products.map(function (p) {
      return {
        id: p._id || '',
        name: p.name || '',
        category: p.category || '',
        price: p.price || '',
        image: p.image || ''
      }
    })
  };
}

const productsReducer = function (state = defaultState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return cleanProducts(action.payload);

    default: return cleanProducts(state);
  }
}

export default productsReducer;