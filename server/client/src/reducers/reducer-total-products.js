import { FETCH_PRODUCTS } from '../actions/index';

export default function (state = 0, action) {

  switch (action.type) {
    case FETCH_PRODUCTS:
      /* This reducer will separate out the total number of products found in our query (we only 
        send back 9 products at a time, but we still want to know how many total products were
        found, in order to show the number of total product pages we are able to click through)
      */
      const totalProducts = action.payload.data.find(element => element.totalProducts || element.totalProducts === 0)

      return totalProducts;

    default:
      return state;
  }
}