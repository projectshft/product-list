const initialState = {
  products: [],
  count: 0,
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "FIND_DATA": {
      return {
        ...state, 
        products: action.payload.data.products,
        count: action.payload.data.count,
      }
    }
    case "CHANGE_PAGE": {
      return {
        ...state,
        products: action.payload.data.products,
      }
    }
    default:
      return state;
  }
};

export default reducer;
