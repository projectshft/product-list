import { SET_CURRENT_PAGE, INCREMENT, DECREMENT, FAIL } from '../actions/actions';



export default function (state = "1", action) {
console.log("state:" , state)

    switch (action.type) {
        case SET_CURRENT_PAGE:
            state = action.page
            console.log("state:", action.page)
            return state
                // products: action.payload.data
                        
        case DECREMENT:
           state = state-1
            console.log("decrement:", action.page-1)
           return state
            
        case INCREMENT:
            state = state+1
            console.log("increment:", action.page+1)
            return state

        case FAIL:
            return "page error"

        default:
            return state;
    }
}