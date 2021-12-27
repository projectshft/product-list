import { FETCH_CATEGORY_LIST } from "../actions";


const CategoryListReducer = function (state = [], action) {

  switch(action.type) {
    case FETCH_CATEGORY_LIST:
      if (action.payload){
        return action.payload.data;
      } else {
        return state;
      }

    default:
      return state;
    };
};

export default CategoryListReducer;