import axios from 'axios';

const ROOT_URL = 'http://localhost:8000';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export function deleteProduct(id) {
    const request = axios.delete(`${ROOT_URL}/products/${id}`);

    return {
        type: DELETE_PRODUCT,
        payload: request
    }
}