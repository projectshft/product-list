import {FETCH_PRODUCTS} from '../actions'

export default function(state = {products: [], count: 0}, action) {

	switch (action.type) {

	case FETCH_PRODUCTS:
		return action.payload.data
	default:
		return state
	}
}
