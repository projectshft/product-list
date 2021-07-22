import { FETCH_ALL_CATEGORIES } from "../actions";

export const categoryReducer = function (state = [], action) {
  switch (action.type) {
    case FETCH_ALL_CATEGORIES:
      const categories = action.payload.data.products.reduce((acc, product) => {
        if (!acc.includes(product.category)) {
          return [...acc, product.category];
        } else {
          return acc;
        }
      }, []);
      console.log(categories);

      return categories;
    default:
      return state;
  }
};
