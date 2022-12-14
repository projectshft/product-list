export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CHANGE_PRICE_SORT = 'CHANGE_PRICE_SORT'
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_CATEGORIES = 'SET_CATEGORIES';

export function changeCategoryFilter(category) {
  return {
    type: CHANGE_CATEGORY,
    payload: category,
  }
}

export function changePriceSortFilter(sortMethod) {
  return {
    type: CHANGE_PRICE_SORT,
    payload: sortMethod,
  }
}

export function setProducts(products) {
  return {
    type: SET_PRODUCTS,
    payload: products
  }
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  }
}