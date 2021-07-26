export const SET_QUERY = "SET_QUERY";

export const loadQuery = (query) => {
  return {
    type: SET_QUERY,
    payload: query,
  };
};
