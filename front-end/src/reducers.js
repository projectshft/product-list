

import {GET_PRODUCTS} from "./actions"

const INITIAL_STATE = {
    products: [],
    totalDocs: null,
    totalPages: null
}

// reducer to store the exact data
export  const ProductsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
      case GET_PRODUCTS: 
        return {
          ...state, 
          products:  action.payload.data[0],     
          totalDocs: action.payload.data[1],
          totalPages: action.payload.data[2]
        }
        default: 
        return state
    }
  
}

