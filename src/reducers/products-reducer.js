import { FETCH_PRODUCTS } from "../actions";

const defaultState = [
  {
    category: "Computers",
    name: "Intelligent Cotton Shirt",
    price: 722,
    image: "https://via.placeholder.com/250?text=Product+Image",
  }
];

// const cleanProducts = products => {
//   return products.map(function (p) {
//     return {
//       category: p.category || '',
//       name: p.name || '',
//       price: p.price || '',
//       image: p.image || '',
//     }
//   });
// }

const productReducer = function (state = [], action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return action.payload.data;
    default: 
      return state;
  }
}

export default productReducer;