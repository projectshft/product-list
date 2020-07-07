import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {

    switch (action.type) {
        case FETCH_PRODUCTS:
          
            /* This reducer is how we will be persisting the state of our query. We will be 
                sending back the query state (category, searchTerm, priceSort, as well as 
                total number of products found based on our query (as we need this for pagination)). 
            */  
            
           const query = action.payload.data.filter(el=> {
              if (!el._id && !el.totalProducts) {
                return el;
              } 
           })

            return query;
           
        default: 
            return state;
    }
}