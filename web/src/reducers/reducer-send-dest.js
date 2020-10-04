import { SEND_DISTANCE } from "../actions";

export default function(state = 2500, action) {
    // console.log('in reducer, looking for actions')
    switch(action.type) {
        case SEND_DISTANCE:
            return action.payload
        default:
            return state;
    }

}

//data sent to details.js