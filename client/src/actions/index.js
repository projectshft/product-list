import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

const ROOT_URL = "http://localhost:8000"



export async function fetchProducts(query) {
    let requestString = '/products';
    
    if ( query.category || query.sort || query.pageNumber) {

        requestString = requestString.concat( '?' );

        if ( query.category ) {
            requestString = requestString.concat( 'category=', query.category, "&" );
        }
        if ( query.sort ) {
            requestString = requestString.concat( 'sort=', query.sort );
        }

        if ( query.PageNumber ) {
            requestString = requestString.concat( 'sort=', query.pageNumber );
        }
    }

    console.log(requestString)
   
    const response = await axios.get(`${ROOT_URL}${requestString}`)

      return {
          type: FETCH_PRODUCTS,
          payload: response
      }
}