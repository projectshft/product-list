import axios from 'axios';

const ROOT_URL = 'http://localhost:8000/products?'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export function fetchProducts(currentPage, currentSort, currentCategory, currentSearch) {

  const url = `${ROOT_URL}`+ '&' +`${currentPage}`+ '&' +`${currentSort}`+ '&' +`${currentCategory}`+`${currentSearch}` 

  const request = axios.get(url);
  console.log(request)


  // .then((response) => {
  //     return response.data
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   });

  return {
    type: FETCH_PRODUCTS,
    payload: request
  };
}

//page size (9)// total number  

//server's job to communicate back 
//to the client 
//total number of all the products that fit into that in 

//Component Pagination 
//kicking off the action 
// in this.props.
// reset the state in the reducer
//resetting the state 
//what category/page/
//new currentPage
// have the component listen and update based on changes  