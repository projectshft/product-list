import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = {}, action) {

  
    switch (action.type) {
        case FETCH_PRODUCTS:
            
            /* This reducer will filter out just the products from our API/DB request and store them
            for easy access in our display components 
            */   
           const products = action.payload.data.filter(product => {
                if (product._id) { 
                    return product;
                }
           })
       
            return products;
           
        default: 
            return state;
    }
}