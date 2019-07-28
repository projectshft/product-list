import axios from 'axios';
export const FETCH_PRODUCTS = 'fetch_products';

const ROOT_URL = 'http://localhost:8000/';

/** If there is alread an existing query param, put "&" before the query. If its the 
		first query param, put "?" before the query.
		This will allow for any number of query params to be set and they will always be 
		in correct format, each query sperated by an "&" */
export async function fetchProducts(query = {}) {
	let url = `${ROOT_URL}products`;
	let existingQueryParams = false;
	
	for (let key in query) {
		if (existingQueryParams) {
			url += `&${key}=${query[key]}`;
		} else {
			url += `?${key}=${query[key]}`;
			existingQueryParams = true;
		}
	}

	const request = await axios.get(url);
	const {docs: products, total, pages, page, limit} = request.data;

	return {
		type: FETCH_PRODUCTS, payload: request, products, total, pages, page, limit
	};	
}
