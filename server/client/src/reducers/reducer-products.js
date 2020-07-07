import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = {}, action) {

    // state = {};
    switch (action.type) {
        case FETCH_PRODUCTS:
            /* We will be sending back the persisted state (category, searchTerm,
               priceSort, as well as total number of products found based on our query (we
               need this for pagination)). We don't want to mutate the state, so we can use destructuring (or concat) to accomplish this
            */   
           const products = action.payload.data.filter(product => {
                if (product._id) { 
                    return product;
                }
           })
           /* products.push({totalProducts: count});
        products.push({search: search})
        products.push({categoryType: categoryType});
        products.push({page: page})
        products.push({priceSortType: priceSortType})

        */
           console.log('inside reducer-products: products=', products)
           console.log('inside reducer-products: action.payload=', action.payload)
           console.log('inside inside reducer-products: action.payload.data=', action.payload.data)
            return products;
           
        default: 
            return state;
    }
}