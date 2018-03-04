import axios from 'axios'

export const FETCH_PRODUCTS = 'fetch_products'

const API_ROOT_URL = 'http://localhost:8000'

export function fetchProducts(category, sortBy, pageNumber) {
	
	const request = axios.get(`${API_ROOT_URL}/products?category=${category}&sort=${sortBy}&page=${pageNumber}`)
	return {
		type: FETCH_PRODUCTS,
		payload: request
	}
}



