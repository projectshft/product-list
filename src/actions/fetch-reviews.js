import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const FETCH_REVIEWS = 'FETCH_REVIEWS';

export function fetchReviews (id) {
    const request = axios.get(`${ROOT_URL}/products/${id}/reviews`)

    return {
        type: FETCH_REVIEWS,
        payload: request
    }
}