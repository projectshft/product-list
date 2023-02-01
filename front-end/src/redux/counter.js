// Action creators

export function getProducts(newUrl) {
  return (dispatch) => {
    fetch(`${newUrl}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        dispatch({ type: "GET_PRODUCTS", products: data });
      });
  };
}

// reducer function
const initialState = {
  products: [],
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        products: action.products,
      };
    default:
      return state;
  }
}
