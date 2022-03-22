import axios from 'axios';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

const rootUrl = 'http://localhost:8000';

export const fetchProducts = async (options = {}) => {
  const queryParams = {
    page: options.page || 1,
    sort: options.sort || 'asc',
    category: options.category || 'null',
  };
  const { page, sort, category } = queryParams;

  const url = `${rootUrl}/products?page=${page}&price=${sort}&category=${category}`;

  const request = await axios.get(url).catch((error) => {
    if (error.response) {
      alert(error.response);
    }
  });
  return {
    type: FETCH_PRODUCTS,
    payload: request,
  };
};

export const fetchCategories = async () => {
  const url = `${rootUrl}/categories`;

  const request = await axios.get(url).catch((error) => {
    if (error.response) {
      alert(error.response);
    }
  });
  return {
    type: FETCH_CATEGORIES,
    payload: request,
  };
};
