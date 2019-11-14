import { SAVE_PAGE } from "../actions"


export default function(state = {}, action) {
    switch (action.type) {
        case SAVE_PAGE:
            return action.payload
        default:
            return state;
    }
}