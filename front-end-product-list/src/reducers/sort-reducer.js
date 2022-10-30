const sortReducer = function (state = [], action) {
  switch (action.type) {
    case 'FETCH_SORT':
      return [action.payload];
    case 'FETCH_DATA':
      return [];
    default:
      return state;
  }
};

export default sortReducer;