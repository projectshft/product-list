// import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FILTER_CATEGORY_SUCCESS = "FILTER_CATEGORY_SUCCESS";
export const SORT_BY_PRICE_SUCCESS = "SORT_BY_PRICE_SUCCESS";
export const CHANGE_PAGE_SUCCESS = "CHANGE_PAGE_SUCCESS";
export const FETCH_QUERY_SUCCESS = "FETCH_QUERY_SUCCESS";

//Synchronous action creators below 
const fetchProductsSuccess = (products, productCount) => ({
  type: 'FETCH_PRODUCTS_SUCCESS',
  payload: { products, productCount }
})

const filterCategorySuccess = (products, productCount, category, sort, query) => ({
  type: 'FILTER_CATEGORY_SUCCESS',
  payload: { products, productCount, category, sort, query }
})

const sortByPriceSuccess = (products, productCount, category, sort, query) => ({
  type: 'SORT_BY_PRICE_SUCCESS',
  payload: { products, productCount, category, sort, query }
})

const changePageSuccess = (products, productCount, category, sort, query) => ({
  type: 'CHANGE_PAGE_SUCCESS',
  payload: { products, productCount, category, sort, query }
})

const fetchQuerySuccess = (products, productCount, category, sort, query) => ({
  type: "FETCH_QUERY_SUCCESS",
  payload: {products, productCount, category, sort, query}
})

//Thunk Actions Below - dispatched on Header and App components

//thunk action to request the first 9 of all 90 products from the db
export const fetchProducts = () => {
  return async (dispatch, getState) => {
  try {
    let response =  await axios.get('http://localhost:8000/products')
    dispatch(fetchProductsSuccess(response.data.products, response.data.productCount));
  }catch (error) {
    console.log(error);
  }
}
}

export const filterByCategory = (category, sort, query) => {
  return async (dispatch, getState) => {
    try {
      let response ;
      if(!sort && !query) {
         response = await axios.get('http://localhost:8000/products?category=' + category)
        console.log('response.data from action: ', response.data);
        dispatch(filterCategorySuccess(response.data.products, response.data.productCount, category, sort, query));
      } 
      if(!sort && query) {
        response = await axios.get('http://localhost:8000/products?query=' + query + '&category=' + category)
       console.log('response.data from action: ', response.data);
       dispatch(filterCategorySuccess(response.data.products, response.data.productCount, category, sort, query));
     }
      if(!query && sort) {
        response = await axios.get('http://localhost:8000/products?category=' + category + '&price=' + sort)
        console.log('response.data from action: ', response.data);
        dispatch(filterCategorySuccess(response.data.products, response.data.productCount, category, sort, query));
      } 
      if (category && sort && query) {
        response = await axios.get('http://localhost:8000/products?query=' + query + '&category=' + category + '&price=' + sort)
        console.log('response.data from action: ', response.data);
        dispatch(filterCategorySuccess(response.data.products, response.data.productCount, category, sort, query));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const sortByPrice = (sort, category, query) => {
  return async (dispatch, getState) => {
    try {
      let response; 
      if(!category && !query) {
        response = await axios.get('http://localhost:8000/products?price=' + sort)
        console.log(response.data.products);
        dispatch(sortByPriceSuccess(response.data.products, response.data.productCount, category, sort, query ));
      }
      if(!category && query) {
        response = await axios.get('http://localhost:8000/products?query=' + query + '&price=' + sort)
        console.log(response.data.products);
        dispatch(sortByPriceSuccess(response.data.products, response.data.productCount, category, sort, query));
      }
      if(!query && category) {
        response = await axios.get('http://localhost:8000/products?category=' + category + '&price=' + sort)
        console.log(response.data.products);
        dispatch(sortByPriceSuccess(response.data.products, response.data.productCount, category, sort, query));
      }
      if (query && category && sort) {
        response = await axios.get('http://localhost:8000/products?query=' + query + '&category=' + category + '&price=' + sort)
        dispatch(sortByPriceSuccess(response.data.products, response.data.productCount, category, sort, query));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const changePage = (page, category, sort, query) => {
  return async (dispatch, getState) => {
    try{
      let response;
      let pageStr = page.toString();
      if (!category && !sort && !query) {
        response = await axios.get('http://localhost:8000/products?page=' + pageStr)
        console.log('no cat, no sort, no query')
        dispatch(changePageSuccess(response.data.products, response.data.productCount, category, sort, query))
      }
      if(!category && !query && sort) {
        response = await axios.get('http://localhost:8000/products?page=' + pageStr +'&price=' + sort)
        console.log('no cat/query, only sort; sort is: ', sort)
        dispatch(changePageSuccess(response.data.products, response.data.productCount, category, sort, query))
      }
      if(!sort && !query && category) {
        response = await axios.get('http://localhost:8000/products?page=' + pageStr +'&category=' + category)
        console.log('no sort/query, only cat: ', category)
        dispatch(changePageSuccess(response.data.products, response.data.productCount, category, sort, query))
      } 
      if(!sort && !category && query) {
        response = await axios.get('http://localhost:8000/products?page=' + pageStr +'&query=' + query)
        console.log('no sort/cat, only query: ', query)
        dispatch(changePageSuccess(response.data.products, response.data.productCount, category, sort, query))
      }
      if (!sort && category && query) {
        response = await axios.get('http://localhost:8000/products?page=' + pageStr +'&query=' + query + '&category=' + category)
        console.log('no sort, only cat: ', category, ' and query: ', query)
        dispatch(changePageSuccess(response.data.products, response.data.productCount, category, sort, query))
      }
      if (!category && sort && query) {
        response = await axios.get('http://localhost:8000/products?page=' + pageStr +'&query=' + query + '&price=' + sort)
        console.log('no cat, only sort: ', sort, ' and query: ', query)
        dispatch(changePageSuccess(response.data.products, response.data.productCount, category, sort, query))
      }
      if (!query && sort && category) {
        response = await axios.get('http://localhost:8000/products?page=' + pageStr +'&category=' + category + '&price=' + sort)
        console.log('no query, only sort: ', sort, ' and category: ', category)
        dispatch(changePageSuccess(response.data.products, response.data.productCount, category, sort, query))
      }
      if (query && sort && category) {
        response = await axios.get('http://localhost:8000/products?page=' + pageStr + '&query=' + query +'&category=' + category + '&price=' + sort)
        console.log('cat: ', category, 'sort: ', sort, 'page: ', pageStr);
        dispatch(changePageSuccess(response.data.products, response.data.productCount, category, sort, query))
      }
    } catch(error) {
      console.log(error);
    }
  }
}
//When searching for products with the query option, the response will always be the first page of results.
export const fetchQuery = (query, category, sort) => {
  return async (dispatch, getState) => {
    let response;
    try {
      if (!category && !sort) {
        response = await axios.get('http://localhost:8000/products?query=' + query)
        dispatch(fetchQuerySuccess(response.data.products, response.data.productCount, category, sort, query));
      }
      if (!category && sort) {
        response = await axios.get('http://localhost:8000/products?query=' + query + '&price=' + sort)
        dispatch(fetchQuerySuccess(response.data.products, response.data.productCount, category, sort, query));
      }
      if (!sort && category) {
        response = await axios.get('http://localhost:8000/products?query=' + query + '&category=' + category)
        dispatch(fetchQuerySuccess(response.data.products, response.data.productCount, category, sort, query));
      } 
      if (category && sort && query) {
        response = await axios.get('http://localhost:8000/products?query=' + query + '&category=' + category + '&price=' + sort)
        dispatch(fetchQuerySuccess(response.data.products, response.data.productCount, category, sort, query));
      }
      
    } catch (error) {
      console.log(error)
    }
  }
}