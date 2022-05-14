
const fetchProducts = (products) => {
  return {
    type: 'FETCH_PRODUCTS',
    payload: products
  }
}

const changePages = (products) => {
  return {
    type: 'PAGE_CHANGE',
    payload: products
  }
}

export {
  fetchProducts,
  changePages
}