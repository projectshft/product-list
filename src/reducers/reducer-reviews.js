import { FETCH_REVIEWS } from '../actions/fetch-reviews';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_REVIEWS:
            return {reviews: action.payload.data}
        default:
            return state
    }
}