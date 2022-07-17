import { FETCH_PRODUCTS } from "../actions";

const productsReducer = function(state = [], action) {
  console.log(action);
  if(action.error === true) {
    alert('error, please try again');
    return state;
  } else {
    switch (action.type) {
      case FETCH_PRODUCTS:
        const products = action.payload.data;
        console.log('reducers' + products);
        const productList = products.map((p) => {
          console.log(p);
          return {
            productName: p.name,
            productCategory: p.category,
            productImg: p.image,
            productPrice: p.price,
            productReviews: p.reviews
          }
        })
        console.log(productList);

        return {...state, productList};

      default: return state;
    }
  }
};

export default productsReducer;