import { SET_SORT_CHOICE } from '../actions';

export default (state = null, action) => {
    switch (action.type){
        case SET_SORT_CHOICE:
            return action.payload;
        default:
            return state;
    }
}