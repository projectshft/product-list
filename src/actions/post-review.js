import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const POST_REVIEW = 'POST_REVIEW';

export function postReview(userName, text, id) {
    const request = axios.post(`${ROOT_URL}/products/${id}/reviews`);
    debugger;

    return {
        type: POST_REVIEW,
        payload: request
    }
}