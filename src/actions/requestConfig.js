export const FILTER_CATEGORY = 'CATEGORY_FILTER';
export const SORT_BY_PRICE = 'SORT_BY_PRICE';
export const SET_QUERY = 'SET_QUERY';
export const SET_PAGE = 'SET_PAGE';

//Request configuration related actions.
export function filterCategory(category){
    return {type: FILTER_CATEGORY, payload: category}
}

export function setPage(page){
    return {type: SET_PAGE, payload: page}
}

export function sortByPrice(sortOrder){
    return {type: SORT_BY_PRICE, payload: sortOrder}
}

export function setQuery(query){
    return {type: SET_QUERY, payload: query}
}