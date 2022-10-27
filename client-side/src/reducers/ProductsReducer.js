// eslint-disable-next-line no-unused-vars
import { FETCH_PRODUCTS } from "../actions/fetchProducts.js";


const ProductsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log('hi');
      return action.payload.data;
    default:
      return state;
  }
};

export default ProductsReducer;

// products.map((product) => {
//   product = {
//     category: product.category,
//     name: product.name,
//     price: product.price,
//   };
//   console.log(product);
//   return(
//     <div>
//       return the grid here
//     </div>
//   );
// });