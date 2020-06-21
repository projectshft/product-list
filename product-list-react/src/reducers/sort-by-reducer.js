export default function(state = [], action) {
  switch (action.type) {
    case "ADD_SORTBY":
      return action.payload;
    default:
      return state;
  }
}