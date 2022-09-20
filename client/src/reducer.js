const initialState = {
  products: [],
  filter: {
    category: "",
  },
  count: 0,
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case "FIND_DATA": {
      console.log("products searched!")
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
    case "UPDATE_CATEGORY": {
      return {
        ...state,
        filter: {
          ...state.filter,
          category: action.payload,
        }
      }
    }
    default:
      return state;
  }
};

export default reducer;
