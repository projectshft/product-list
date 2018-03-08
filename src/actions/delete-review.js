import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const DELETE_REVIEW = 'DELETE_REVIEW';

export function deleteReview(reviewId) {
    const request = axios.delete(`${ROOT_URL}/reviews/${reviewId}`);

    return {
        type: DELETE_REVIEW,
        payload: request
    }
}