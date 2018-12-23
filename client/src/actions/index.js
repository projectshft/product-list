//action creators

export const selectCategory = category => {
    return {
        type: "SET_CATEGORY",
        payload: category
    };
};

export const setNewProducts = products => {
    return {
        type: "NEW_SEARCH",
        payload: setNewProducts
    };
};

export const goToSelectedPage = pageNumber => {
    return {
        type: "SELECT_PAGE",
        payload: pageNumber
    };
};

export const setNumberOfPages = numberOfPages => {
    return {
        type: "SET_PAGES",
        payload: numberOfPages
    };
};

export const selectSort = sortType => {
    return {
        type: "SET_SORT",
        payload: sortType
    };
};