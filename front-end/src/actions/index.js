import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";



export async function fetchCity() {
    const PRODUCT_URL = "localhost:8000";    
    const request = await axios.get(`${PRODUCT_URL}`);
       
    return {
        type: FETCH_PRODUCTS,
        payload: request
    };
}