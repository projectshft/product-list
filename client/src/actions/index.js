import * as api from '../api/index'


export const createProduct = (product) => async (dispatch) => {
  const { data } = await api.createProduct(product);
  dispatch({ type: 'PRODUCT', payload: data });
  }


export const getProducts = () => async (dispatch) => {
  const {data} = await api.getProducts();
  dispatch({ type: 'GET', payload: data})
    }

export const deletePost = (id) => async (dispatch) => {
  const { data } = await api.deletePost(id);
  dispatch({ type: 'DELETE', payload: data });
   }



// export const FETCH_WEATHER = "FETCH_WEATHER";
// export const SET_ERROR = "SET_ERROR";

// const ROOT_URL = "https://api.openweathermap.org/data/2.5/forecast";

// //Fetch 5-day weather data using axios
// export function fetchWeather(city) {
//   const request = axios.get(
//     `${ROOT_URL}/?q=${city}&appid=5de1b63f3ad7c2600e3f33f10036d1ec&units=imperial`
//   );

//   return {
//     type: FETCH_WEATHER,
//     payload: request,
//   };
// }

// export function setError(errors) {
//   return {
//     type: SET_ERROR,
//     payload: errors,
//   };
// }
