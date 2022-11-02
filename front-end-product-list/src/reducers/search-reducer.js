const searchReducer = function (state = null, action) {
  switch (action.type) {
    case 'FETCH_QUERY':
      return action.payload;
    case 'FETCH_PAGINATION':
      return {...state,...action.payload};
    default:
      return state;
  }
};

export default searchReducer;