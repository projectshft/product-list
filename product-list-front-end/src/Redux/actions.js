
const fetchProducts = (products) => {
  return {
    type: 'FETCH_PRODUCTS',
    payload: products
  }
}

const searchTerm = (term) => {
  return {
    type: 'SEARCH_TERM',
    payload: term
  }
}

export {
  fetchProducts,
  searchTerm
}