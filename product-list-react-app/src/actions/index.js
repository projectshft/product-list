import axios from "axios";

const ROOT_URL = "http://localhost:8000/"

export const GET_PRODUCTS = "get_products"
export const SEARCH_PRODUCTS = "search_products"

//getProducts can be used to return all products from the server
//It takes in a query which can also hold category, price and page keys
//If passed these keys getProducts uses them
//To get products from the server based on their category
//Order them by price and find the correct products based on page
export function getProducts(query) {
    let queryUrl = ""

    if (query.category) {
        queryUrl = queryUrl + "&category=" + query.category 
    }

    if (query.price) {
        queryUrl = queryUrl + "&price=" + query.price
    } 

    if (query.page) {
        queryUrl = queryUrl + "&page=" + query.page
    }

    

    const url = `${ROOT_URL}products?${queryUrl}`

    const products = axios.get(url) 
        .catch((error) => {
            if (error.response) {
                alert(error)
            }
        })

    return {
        type: GET_PRODUCTS,
        payload: products
    }
}

//searchProducts takes a user query and creates a new GET /search request
export function searchProducts(query) {
    let queryUrl = `${ROOT_URL}search?query=${query}`

    const products = axios.get(queryUrl) 
        .catch((error) => {
            if (error.response) {
                alert(error)
            }
        })

    return {
        type: SEARCH_PRODUCTS,
        payload: products
    }
}



