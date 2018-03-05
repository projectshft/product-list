import axios from "axios";

const ROOT_URL = "http://localhost:8000";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const GET_COUNT = "GET_COUNT"

export const SET_CATEGORY = "SET_CATEGORY"
export const SET_PAGE = "SET_PAGE"
export const SET_SORT = "SET_SORT"
export const GET_CATEGORIES = "GET_CATEGORIES"

export const POPULATE_PRODUCTS = "POPULATE_PRODUCTS"

export function fetchProducts(query) {
  const category = query.category
  const page = query.page
  const price = query.price
  let urlQuery = ""
  if (category || page || price) {
    const categoryQuery = category ? "category="+category : ""
    const pageQuery = page ? "page="+page : ""
    const sortQuery = price ? "price="+price : ""
    urlQuery = `?${pageQuery}&${categoryQuery}&${sortQuery}`
  }
  const url = `${ROOT_URL}/products${urlQuery}`
  const request = axios.get(url, {headers: { "Content-Type" : "application/json"}})
  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: category
  }
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    payload: page
  }
}

export function setSort(price) {
  return {
    type: SET_SORT,
    payload: price
  }
}

export function populateProducts() {
  const url = `${ROOT_URL}/generate-fake-data`
  const request = axios.get(url, {headers: { "Content-Type" : "application/json"}})
  return {
    type: POPULATE_PRODUCTS,
    payload: request
  };
}

export function getCount(query) {
  const category = query.category
  const page = query.page
  const price = query.price
  let urlQuery = ""
  if (category || page || price) {
    const categoryQuery = category ? "category="+category : ""
    const pageQuery = page ? "page="+page : ""
    const sortQuery = price ? "price="+price : ""
    urlQuery = `?${pageQuery}&${categoryQuery}&${sortQuery}`
  }
  const url = `${ROOT_URL}/products/count${urlQuery}`
  const request = axios.get(url, {headers: { "Content-Type" : "application/json"}})
  return {
    type: GET_COUNT,
    payload: request
  };
}

export function getCategories() {
  const url = `${ROOT_URL}/products/categories`
  const request = axios.get(url, {headers: { "Content-Type" : "application/json"}})
  return {
    type: GET_CATEGORIES,
    payload: request
  };
}
