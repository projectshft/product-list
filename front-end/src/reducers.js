

import {GET_PRODUCTS} from "./actions"

const INITIAL_STATE = {
    productsPerPage: null,
    page: null,
    products: [],
    totalPages: null,
    totalRecords: null
    
}

// reducer to store the exact data
export  const ProductsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
      case GET_PRODUCTS: 
      console.log(action.payload.data[0]);
        return {
          ...state, 
          productsPerPage:  action.payload.data[0].limit,
          page: action.payload.data[0].page,
          products: [...state.products, action.payload.data[0].pageData],
          totalPages: action.payload.data[0].pages,
          totalRecords: action.payload.data[0].total

        }
        default: 
        return state
    }
  
}

