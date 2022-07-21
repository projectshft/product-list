import { FETCH_PRODUCTS } from "../actions";

const productsReducer = function(state = [], action) {

  if(action.error === true) {
    alert('error, please try again');
    return state;
  } else {
    switch (action.type) {
      case FETCH_PRODUCTS:
        const products = action.payload.data;

        const productList = products.map((p) => {
          return {
            id: p._id,
            productName: p.name,
            productCategory: p.category,
            productImg: p.image,
            productPrice: p.price,
          }
        })

        return {...state, productList};

      default: return state;
    }
  }
};

export default productsReducer;