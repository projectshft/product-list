import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {

    state = [];
    switch (action.type) {
        case FETCH_PRODUCTS:
            /* We will be sending back the persisted state (category, searchTerm,
               priceSort, as well as total number of products found based on our query (we
               need this for pagination)). We don't want to mutate the state, so we can use destructuring (or concat) to accomplish this
            */   
            return [action.payload.data, action.payload.headers.productcount, action.payload.headers.querydata, ...state];
           
        default: 
            return state;
    }
}