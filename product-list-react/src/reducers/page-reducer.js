export default function(state = [], action) {
  switch (action.type) {
    case "ADD_PAGE":
      return action.payload
    default:
      return state;
  }
}