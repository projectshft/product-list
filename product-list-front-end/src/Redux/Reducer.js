
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return [
        ...state,
        action.payload
      ];
    default:
  }
}

export default reducer