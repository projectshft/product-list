import axios from "axios";

const ROOT_URL = `http://localhost:8000/products`;

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";


//this function is added to the product-list component and called when the component mounts so that the data is passed to that component
export function fetchProducts(query) {
  const request = axios.get(ROOT_URL);

  let config = {
    category: query.category,
    search: query.search,
    price: query.price,
    page: query.page
  };

  const response = axios({
    url: ROOT_URL,
    method: 'get',
    params: config
  })

  console.log('Requested Data Response: ', request)

  return {
    type: FETCH_PRODUCTS,
    payload: response
  };
}

//request is the promise - doesn't initially contain data
//to see what data is returned -- look in reducers