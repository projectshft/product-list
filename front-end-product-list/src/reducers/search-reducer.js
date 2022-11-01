const searchReducer = function (state = {}, action) {
  switch (action.type) {
    case 'FETCH_QUERY':
      return action.payload;
    case 'FETCH_PAGINATION':
      return {...state,products: action.payload.products, currentPage: action.payload.page};
    default:
      return state;
  }
};

export default searchReducer;