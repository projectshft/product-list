import { FETCH_PRODUCTS } from '../actions/index';

export default function(state = [], action) {
    console.log('Action', action)
    console.log('Action payload: ', action.payload);
   // console.log('Action payload data: ', action.payload.data);
    switch (action.type) {
        case FETCH_PRODUCTS:
            console.log('Inside reducer: action.payload: ', action.payload)
            //we never want to mutate the state, so we usually concat any new data  
            //we could have written return state.concat([action.payload.data]); but with destructuring we can write it below as..
            //from BT project: return _.mapKeys(action.payload.data, "id");
            return [action.payload.data, ...state];
        default: 
            return state;
    }
}