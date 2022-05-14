
const fetchProducts = (products) => {
  return {
    type: 'FETCH_PRODUCTS',
    payload: products
  }
}

const changePages = (num) => {
  return {
    type: 'PAGE_CHANGE',
    payload: num
  }
}

export {
  fetchProducts,
  changePages
}