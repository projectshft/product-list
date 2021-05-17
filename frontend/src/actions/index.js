import axios from 'axios';
import _ from "lodash";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

const ROOT_URL = "http://localhost:8000/products"

export async function fetchProducts(page, categoryQuery, priceQuery, searchValue) {

  let inputs = {};
  if (page) inputs['page'] = page;
  if (categoryQuery) inputs['category'] = categoryQuery;
  if (priceQuery) inputs['priceSort'] = priceQuery;
  if (searchValue) inputs['searchValue'] = searchValue;

  if (!_.isEmpty(inputs)) {
    const request = await axios.get(`${ROOT_URL}?page=${page}&category=${categoryQuery}&price=${priceQuery}&query=${searchValue}`);

    return {
      type: FETCH_PRODUCTS,
      payload: { products: request.data }
    }
  } else {
    const request = await axios.get(`${ROOT_URL}`);

    return {
      type: FETCH_PRODUCTS,
      payload: { products: request.data }
    }
  }
};
