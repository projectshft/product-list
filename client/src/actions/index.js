import axios from "axios";

export const FETCH_PRODUCTS = "fetch_products";

const ROOT_URL = "http://localhost:8000"


//this is the single action creator that kicks off a get request for products in the database.  It uses async/await to ensure that the response from the server is saved to the response variable before the action is created.  The requestString variable continues to concatenate as more query parameters are detected until the final concatenation is appended to the baseURL string for the get request.
export async function fetchProducts(query) {
    let requestString = '/products';
    
    if ( query.category || query.sort || query.pageNumber) {

        requestString = requestString.concat( '?' );

        if ( query.category ) {
            requestString = requestString.concat( 'category=', query.category, "&" );
        }
        if ( query.sort ) {
            requestString = requestString.concat( 'sort=', query.sort, "&" );
        }

        if ( query.pageNumber ) {
            requestString = requestString.concat( 'pageNumber=', query.pageNumber );
        }
    }
    
   
    const response = await axios.get(`${ROOT_URL}${requestString}`)

      return {
          type: FETCH_PRODUCTS,
          payload: response
      }
}