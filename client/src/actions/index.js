import axios from "axios";
export const FETCH_PRODUCT = "FETCH_PRODUCT";
const ROOT_URL = `http://localhost:9000/products`;
export function fetchProduct(item){
    alert("fetching")
    const url = `${ROOT_URL}&q=${item}`;
    const request = axios.get(url)
    return {
        type : FETCH_PRODUCT,
        payload  : request
    }
}