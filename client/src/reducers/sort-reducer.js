import { ADD_SORTER } from '../actions'

//set category-reducer which returns the value of the sort button the user clicked 
export default function(state = '', action) {
    switch (action.type) {
        case ADD_SORTER:
            return action.payload
        default:
            return state;
    }
}