import { FETCH_PRODUCTS } from "../actions";
import _ from 'lodash';

const ProductsReducer = function(state = [], action) {  
switch (action.type) {   
    case FETCH_PRODUCTS:       
        
        return  [...state, action.payload.data]
        
    default:
        return state;
} 
}    

export default ProductsReducer;

