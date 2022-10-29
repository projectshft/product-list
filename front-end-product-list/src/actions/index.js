import axios from 'axios';
// import _ from 'lodash';

export async function fetchData(input) {

  const rootQueryURL = 'http://localhost:8000/products?query=';
  const request = await axios.get(`${rootQueryURL}${input}`);

  return {
    type: 'FETCH_DATA',
    payload: request.data,
  };
}
