import axios from "axios";

export const FIND_DATA = "FIND_DATA";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export function findData(filter)  {
  let query=generateQuery(filter);
  console.log(query);
  const request = axios.get(`http://localhost:8000/products${query}`);

  return {
    type: FIND_DATA,
    payload: request,
  }
};

export function changePage(filter, page) {
  let query=generateQuery(filter);
  const request = axios.get(`http://localhost:8000/products${query}page=${page}`);

  return {
    type: CHANGE_PAGE,
    payload: request,
  }
};

export function updateCategory(category) {
  return {
    type: UPDATE_CATEGORY,
    payload: category,
  }
}

const generateQuery = (filter) => {
  let query = "?";
  if (filter.category) {
    query = `${query}category=${filter.category}&`
  }
  return query;
}
