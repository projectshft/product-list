import axios from 'axios';

const rootURL = 'http://localhost:8000/';

export async function fetchCategories() {
  const requestCat = await axios.get(`${rootURL}categories`).catch((err) => console.log(err));
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

  const requestQuery = await axios
    .get(
      `${rootURL}products?query=${search}&category=${category}&price=${price}&page=${page}`
    )
    .catch((err) => console.log(err));

  const objtoReturn = {
    products: requestQuery.data.products,
    currentPage: page,
    count: requestQuery.data.count,
    currentState: stateObj,
    error:
      requestQuery.data.products.length === 0
        ? 'No product was found. Try another search parameters.'
        : '',
  };
  return {
    type: 'FETCH_QUERY',
    payload: objtoReturn,
  };
}

export async function fetchPagination(stateObj, page = 1) {
  const { search, category, price } = stateObj;
  const dataPagination = await axios.get(
    `${rootURL}products?query=${search}&category=${category}&price=${price}&page=${page}`
  ).catch((err) => console.log(err));;
  const objtoReturn = {
    products: dataPagination.data.products,
    currentPage: page,
  };

  return {
    type: 'FETCH_PAGINATION',
    payload: objtoReturn,
  };
}
