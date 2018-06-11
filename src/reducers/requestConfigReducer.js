import {FILTER_CATEGORY, SORT_BY_PRICE, SET_QUERY, SET_PAGE} from '../actions/requestConfig'

// This reducer only handles request configurations before sending to server
export default function(state = {
    category:"",
    sortPrice:"",
    query:"",
    page: 1
}, action){
    switch(action.type){
        case SET_PAGE:
            return {...state, page: action.payload};
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