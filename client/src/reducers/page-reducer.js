import {ADD_PAGE} from '../actions'

export default function (state = 1, action) {
    switch (action.type) {
        case ADD_PAGE: 
        return action.payload;
        default:
            return state;
    }
}