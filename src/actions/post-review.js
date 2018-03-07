import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const POST_REVIEW = 'POST_REVIEW';

export function postReview(userName, text, id) {
    // if username and/or text input fields are empty, return faker data, otherwise return input data
    let name;
    let content;
    userName !== "" ? name = userName : name = null;
    text !== "" ? content = text : content = null;

    const request = axios.post(`${ROOT_URL}/products/${id}/reviews`, {userName: name, text: content});

    return {
        type: POST_REVIEW,
        payload: request
    }
}