
import { GET_PRODUCTS  } from "../actions";

const DEFAULT_STATE = {}

const reducer = function (state = DEFAULT_STATE, action) {
    switch(action.type){
        case GET_PRODUCTS:
            return action.payload.data;
        default:
                return state;
    }
}

export default reducer;