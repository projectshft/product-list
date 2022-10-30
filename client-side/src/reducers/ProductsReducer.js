// // eslint-disable-next-line no-unused-vars
// import { FETCH_PRODUCTS } from "../actions/fetchProducts.js";
// import { FETCH_PRODUCTS_ERROR } from "../actions/fetchProducts.js";

// const ProductsReducer = (state = [], action) => {
//   switch (action.type) {
//     case FETCH_PRODUCTS:
//       let data = action.payload;
//       console.log(data);

//       if (data.search.query === "") {
//         return { ...state, products: data.products };
//       } else {
//         let filteredProducts = data.products.filter((product) => {
//           return product.name
//             .toLowerCase()
//             .includes(data.search.query.toLowerCase());
//         });
//         return { ...state, products: filteredProducts };
//       }
//     case FETCH_PRODUCTS_ERROR:
//       return { ...state, error: action.payload };
//     default:
//       const defaultState = { data: [], error: "" };
//       return defaultState;
//   }
// };



// export default ProductsReducer;
