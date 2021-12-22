import { FETCH_PRODUCTS } from "../actions";
import { FETCH_CATEGORIES } from "../actions";
import _ from 'lodash';

const productsReducer = function(state = [], action) {  
switch (action.type) {   
    case FETCH_PRODUCTS:        
        return  action.payload.data;
    case FETCH_CATEGORIES:
        return state;        
    default:
        return state;
} 
}    

export default productsReducer;

