import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const POST_PRODUCT = 'POST_PRODUCT';

export function postProduct(name, category, price) {
    let productName;
    let productCategory;
    let productPrice;
    name !== '' ? productName = name : productName = null;
    category !== '' ? productCategory = category : productCategory = null;
    price !== '' ? productPrice = price : productPrice = null;

    const request = axios.post(`${ROOT_URL}/products`, {name: productName, category: productCategory, price: productPrice})

    return {
        type: POST_PRODUCT,
        payload: request
    }
}