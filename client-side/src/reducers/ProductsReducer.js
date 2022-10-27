// eslint-disable-next-line no-unused-vars
import { FETCH_PRODUCTS } from "../actions/fetchProducts.js";
import { FETCH_PRODUCTS_ERROR } from "../actions/fetchProducts.js";

const ProductsReducer = (state = [], action) => {
  let arr = [];
  switch (action.type) {
    case FETCH_PRODUCTS:
      let products = action.payload;

      let fetchedProducts = products.map(function (product) {
        product = {
          category: product.category,
          name: product.name,
          price: product.price,
        };
        arr.push(product);
        return arr;
      });
      // return {error: '', products: fetchedProducts};
      return { error: '', products: fetchedProducts };
    case FETCH_PRODUCTS_ERROR:
      return { ...state, error: action.payload };
    default:
      const defaultState = { data: [], error: "" };
      return defaultState;
  }
};

export default ProductsReducer;
