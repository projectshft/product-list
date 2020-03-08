import { EDIT_CATEGORY, EDIT_SEARCH, EDIT_PAGE, EDIT_PRICE } from '../actions/index';

export default function (state = { page: 'page=1', category: '', price: '', search:'' }, action) {
    switch (action.type) {
        case EDIT_PAGE:
            return Object.assign({}, state, {
                page: action.page
            })
        case EDIT_CATEGORY:
            return Object.assign({}, state, {
                page: 'page=1',
                category: action.category,
            })
        case EDIT_PRICE:
            return Object.assign({}, state, {
                page: 'page=1',
                price: action.price
            })
        case EDIT_SEARCH:
            return Object.assign({}, state, {
                page: 'page=1',
                search: action.search
            })
        default:
            return state;
    }
}