import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

const ROOT_URL = "http://localhost:8000"

export function fetchProducts(query) {
    let requestString = '/products';
    
    if ( query.category || query.sort ) {

        requestString = requestString.concat( '?' );

        if ( query.category ) {
            requestString = requestString.concat( 'category=', query.category )
        }
        if ( query.sort ) {
            requestString = requestString.concat( query.sort )
        }
    }

    const request = axios.get( `${ROOT_URL}${requestString}` )
    
    return {
        type: FETCH_PRODUCTS,
        payload: request
    }


}