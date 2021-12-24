import axios from "axios";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

const ROOT_URL = "http://localhost:8000";  

export async function fetchProducts(page, category, query, sorting) {      
    const request = await axios.get(`${ROOT_URL}/products?page=${page}&category=${category}&query=${query}&price=${sorting}`);
       
    return {
        type: FETCH_PRODUCTS,
        payload: request        
    };    
};



