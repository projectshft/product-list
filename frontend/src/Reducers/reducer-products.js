export default function (state = {}, action) {
  if (action.error) return action.error;
  switch (action.type) {
    default:
      return state;
  }
}