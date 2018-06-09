import {CHANGE_CATEGORY, CHANGE_SORT} from '../actions'

export default function(state = {
    category: "Select Categories",
    sort: "Select Sort"
}, action){
    switch(action.type){
        case CHANGE_CATEGORY:
            return {...state, category: action.payload}; 
        case CHANGE_SORT:
            return {...state, sort: action.payload};
        default:
            return state;
    }    
}