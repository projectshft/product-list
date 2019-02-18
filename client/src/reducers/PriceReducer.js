import { SORT_BY_PRICE_DECREASING,  FAIL, SORT_BY_PRICE_INCREASING } from '../actions/actions';

export default function (state = '', action) {
    switch (action.type) {
        case SORT_BY_PRICE_INCREASING:
            state = 'increasing';
            console.log("state:", state)
            return state

        case SORT_BY_PRICE_DECREASING:
            state = 'decreasing';
            console.log("state:", state)
            return state

        case FAIL:
            return "sorting error"

        default:
            return state;
    }
}  