import axios from 'axios';

const rootURL = 'http://localhost:8000/';

export async function fetchCategories() {
  const requestCat = await axios.get(`${rootURL}categories`);
  const categoriesArr = requestCat.data.reduce((acc, obj) => {
    acc.push(obj.category);
    return [...new Set(acc)];
  }, []);
  return {
    type: 'FETCH_CATEGORIES',
    payload: categoriesArr,
  };
}

export async function fetchQuery(stateObj, page = 1) {
  const { search, category, price } = stateObj;
  const requestQuery = await axios.get(
    `${rootURL}products?query=${search}&category=${category}&price=${price}&page=${page}`
  )

  const objtoReturn = {
    products: requestQuery.data.products,
    currentPage: page,
    count: requestQuery.data.count,
    currentState: stateObj,
  };
  console.log(objtoReturn);
  return {
    type: 'FETCH_QUERY',
    payload: objtoReturn,
  };
}

export async function fetchSort(stateObj, page = 1) {
  const { search, category, price } = stateObj;
  console.log(stateObj);
  const requestQuery = await axios.get(
    `${rootURL}products?query=${search}&category=${category}&price=${price}`
  );
  const objtoReturn = {
    products: requestQuery.data.products,
    currentPage: page,
    count: requestQuery.data.count,
    currentState: stateObj,
  };
  return {
    type: 'FETCH_SORT',
    payload: objtoReturn,
  };
}

export async function fetchPagination(stateObj, page = 1) {
  const { search, category, price } = stateObj;
  const dataPagination = await axios.get(
    `${rootURL}products?query=${search}&category=${category}&price=${price}&page=${page}`
  );
  const objtoReturn = {
    products: dataPagination.data.products,
    currentPage: page,
  };
  console.log(objtoReturn);
  return {
    type: 'FETCH_PAGINATION',
    payload: objtoReturn,
  };
}
