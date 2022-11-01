const searchReducer = function (state = [], action) {
  switch (action.type) {
    case 'FETCH_QUERY':
      return {...action.payload};
    case 'FETCH_DATA':
      return [];
    default:
      return state;
  }
};

export default searchReducer;