import { FETCH_PRODUCTS2 } from "../actions/fetchProducts2.js";
import { FETCH_PRODUCTS2_ERROR } from "../actions/fetchProducts2.js";

const ProductsReducer2 = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS2:
      let data = action.payload;
      console.log(data);

      if (data.search.category === "") {
        return { ...state, products: data.products };
      } else {
        let filteredProducts = data.products.filter((product) => {
          return product.category
            .toLowerCase()
            .includes(data.search.category.toLowerCase());
        });
        return { ...state, products: filteredProducts };
      }
    case FETCH_PRODUCTS2_ERROR:
      return { ...state, error: action.payload };
    default:
      const defaultState = { data: [], error: "" };
      return defaultState;
  }
};




export default ProductsReducer2;
