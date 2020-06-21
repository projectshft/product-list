import { FETCH_PRODUCTS } from '../actions/index';
import { reduceRight } from 'lodash';

export default function(state = [], action) {
    console.log('Action', action)
    console.log('Action payload: ', action.payload);
   // console.log('Action payload data: ', action.payload.data);
    state = [];
    switch (action.type) {
        case FETCH_PRODUCTS:
            console.log('Inside reducer: action.payload.data: ', action.payload.data)
            //we never want to mutate the state, so we usually concat any new data  
            //we could have written return state.concat([action.payload.data]); but with destructuring we can write it below as..
            //from BT project: return _.mapKeys(action.payload.data, "id");
            // return [action.payload.data, ...state];
            
            console.log('inside reducer, checking size of state, state: ', state)
            console.log('inside reducer: action.payload.headers.productCount:', action.payload.headers.productcount)
            console.log('inside reducer, checking concat for new state: ', [action.payload.data, action.payload.headers.productCount, ...state])
            return [action.payload.data, action.payload.headers.productcount, ...state];
            //return state.concat([action.payload.data],[action.payload.headers.productcount])
            //return state;
        default: 
            return state;
    }
}