import {GET_ALL_PRODUCTS} from "../actions/action-names"

const INITIAL_STATE = {
    products: [],
    totalDocs: null,
    totalPages: null,
    categories: null,
    pageNum: 1
}

// reducer to store the exact data
export  const ProductsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
      
      case GET_ALL_PRODUCTS: 
        return {
          ...state, 
          products:  action.payload.data[0],     
          totalDocs: action.payload.data[1],
          totalPages: action.payload.data[2],
          categories: action.payload.data[3],
          pageNum: action.payload.data[4]
        }
        default: 
        return state
    }
  
}

