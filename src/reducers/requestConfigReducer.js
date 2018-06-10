import {FILTER_CATEGORY, SORT_BY_PRICE, SET_QUERY} from '../actions/requestConfig'

// This reducer only handles request configurations before sending to server
export default function(state = {
    category:"",
    sortPrice:"",
    query:""
}, action){
    switch(action.type){
        case SET_QUERY:
            return {...state, query: action.payload};
        case FILTER_CATEGORY:
            return {...state, category: action.payload}; 
        case SORT_BY_PRICE:
            return {...state, sortPrice: action.payload};
        default:
            return state;
    }    
}