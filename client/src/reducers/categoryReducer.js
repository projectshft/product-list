import { SAVE_CATEGORY } from "../actions"


export default function(state = {}, action) {
    switch (action.type) {
        case SAVE_CATEGORY:
            return action.payload
        default:
            return state;
    }
}