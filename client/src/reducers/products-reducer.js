import { FETCH_PRODUCTS, FETCH_CATEGORIES, FETCH_SORT, FETCH_CATEGORIES_AND_SORT } from '../actions'

//set product-reducer which returns the products data from the api 
export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return action.payload.data
        case FETCH_CATEGORIES:
            return action.payload.data
        case FETCH_SORT:
            return action.payload.data
        case FETCH_CATEGORIES_AND_SORT:
            return action.payload.data
        default:
            return state;
    }
}