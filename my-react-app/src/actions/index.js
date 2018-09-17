import axios from "axios";

const ROOT_URL = `http://localhost:4000/products`;

export const FETCH_PRODUCT = "FETCH_PRODUCT";

export function fetchProduct(filter={}) {
    let URL = ROOT_URL;
    let hasQueryIndicator = false;

    for(let key in filter) {
        if(hasQueryIndicator)
            URL += "&";
        else
            URL += "?";
        hasQueryIndicator = true;

        URL += key + "=" + filter[key];
    }

    const request = axios.get(URL);
    console.log('Request', request);

    return {
        type: FETCH_PRODUCT,
        payload: request
    };
}