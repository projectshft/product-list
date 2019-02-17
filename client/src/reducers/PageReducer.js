import { SET_CURRENT_PAGE, INCREMENT, DECREMENT, FAIL } from '../actions/actions';


// const initialState = '1'
export default function (state = "1", action) {
console.log("state:" , state)

    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                page: this.props.page
            }

        case DECREMENT:
            return {
                page: state.page - 1
            }

        case INCREMENT:
            return {
                page: state.page + 1
            }

        case FAIL:
            return "page error"

        default:
            return state;
    }
}