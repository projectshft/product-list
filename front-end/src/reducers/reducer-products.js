import { FETCH_PRODUCTS, FETCH_PRODUCTS_BY_CATEGORY } from '../actions';

export default (state = {count: 0, products:[]}, action) => {
    switch (action.type){
        case FETCH_PRODUCTS:
            console.log(action.payload.data);
            return action.payload.data;
        case FETCH_PRODUCTS_BY_CATEGORY:
            return action.payload.data;
        default:
            return state;
    }
}