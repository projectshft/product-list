import axios from 'axios';
// import _ from 'lodash';

const rootURL='http://localhost:8000/'

export async function fetchQuery(obj) {
  const {search,category,price}=obj
  console.log(obj)
  const requestQuery = await axios.get(`${rootURL}products?query=${search}&category=${category}&price=${price}`);
  console.log(requestQuery)
  return {
    type: 'FETCH_QUERY',
    payload: requestQuery.data
  };
}

export async function fetchCategories() {

  const requestCat = await axios.get(`${rootURL}categories`);

  const categoriesArr = requestCat.data.reduce((acc, obj) => {
    acc.push(obj.category);
    return [...new Set(acc)];
  },[])

  return {
    type: 'FETCH_CATEGORIES',
    payload: categoriesArr,
  };
}

// export async function fetchCategory(input) {

//   const requestCategory = await axios.get(`${rootURL}products?category=${input}`);
//   console.log(requestCategory)

//   return {
//     type: 'FETCH_CATEGORY',
//     payload: requestCategory.data,
//   };
// }

// export async function fetchSort(input) {

//   const requestSort = await axios.get(`${rootURL}products?sort=${input}`);
//   console.log(requestSort)

//   return {
//     type: 'FETCH_SORT',
//     payload: requestSort,
//   };
// }