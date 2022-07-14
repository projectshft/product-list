import { combineReducers } from "redux";
import { FETCH_PRODUCTS } from "../actions";

const rootReducer = combineReducers({
  products: productsReducer,
});

const productsReducer = function(state = [], action) {
  if(action.error === true) {
    alert('error, please try again');
    return state;
  } else {
    switch (action.type) {
      case FETCH_PRODUCTS:
        const products = action.payload.data;
        console.log(products);
        // const cityForecast = forecast.map((p) => {
        //   console.log(p);
        //   return {
        //     city: p.city.name,
        //     temperature: p.list.main.temp,
        //     pressure: p.list.main.temp,
        //     humidity: p.list.main.temp
        //   }
        // });
        
        // console.log(cityForecast);
        // return [...state, cityForecast];
      default: return state;
    }
  }
};

export default rootReducer;