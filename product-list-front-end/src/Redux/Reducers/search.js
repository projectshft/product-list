const search = (state = 0, action) => {
  switch (action.type) {
    case 'SEARCH_TERM':
      return state = action.payload
    default:
      return state;
  }
}

export default search;