import { SAVE_SORT } from "../actions"


export default function(state = {}, action) {
    switch (action.type) {
        case SAVE_SORT:
            return action.payload
        default:
            return state;
    }
}