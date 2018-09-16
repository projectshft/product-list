const initialState = {
  items: [],
}

export default function (state = [], action) {
  console.log('Action', action);
  return state;
}