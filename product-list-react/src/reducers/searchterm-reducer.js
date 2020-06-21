export default function(state = [], action) {
  switch (action.type) {
    case "ADD_SEARCHTERM":
      return action.payload
    default:
      return state;
  }
}