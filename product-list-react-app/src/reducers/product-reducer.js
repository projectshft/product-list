import { GET_PRODUCTS, SEARCH_PRODUCTS } from "../actions/index.js"

//product-reduce.js takes data from actions/index.js
//and uses it to return a new state
export default function(state = [], action) {
    switch (action.type) {
        case GET_PRODUCTS:
            state = []
            return state.concat([action.payload.data])
        case SEARCH_PRODUCTS:
            state = []
            return state.concat([action.payload.data])
        default:
            return state
    }
}