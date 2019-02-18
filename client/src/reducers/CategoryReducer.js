import { FILTER_BY_CATEGORY, FAIL} from '../actions/actions';

export default function (state = '', action) {
    switch (action.type) {
        case FILTER_BY_CATEGORY:
            state = action.payload.data["0"].category;
            console.log("state:", action.payload.data["0"].category)
            return state

        case FAIL:
            return "category error"

        default:
            return state;
    }
}  