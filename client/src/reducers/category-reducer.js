import { ADD_CATEGORIES } from '../actions'

//set category-reducer which returns the value of the category button the user clicked 
export default function(state = '', action) {
    switch (action.type) {
        case ADD_CATEGORIES:
            state = action.payload;
            return state;
        default:
            return state;
    }
}