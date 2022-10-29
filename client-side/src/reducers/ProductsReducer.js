// eslint-disable-next-line no-unused-vars
import { FETCH_PRODUCTS } from "../actions/fetchProducts.js";
import { FETCH_PRODUCTS_ERROR } from "../actions/fetchProducts.js";

const ProductsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      let data = action.payload;
      console.log(data);

      if (data.search.query === '') {
        return { ...state, products: data.products };
      } else {
        console.log("hi");

        function fetchedProducts() {
          data.products.map(function (product) {
            product = {
              category: product.category,
              name: product.name,
              price: product.price,
            };
            return product;
          });
          return fetchedProducts;
          
        }
        // fetchedProducts();
        // return {error: '', products: fetchedProducts};
        return { error: "", products: fetchedProducts  };
      }
    // eslint-disable-next-line no-fallthrough
    case FETCH_PRODUCTS_ERROR:
      return { ...state, error: action.payload };
    default:
      const defaultState = { data: [], error: "" };
      return defaultState;
  }
};

export default ProductsReducer;
