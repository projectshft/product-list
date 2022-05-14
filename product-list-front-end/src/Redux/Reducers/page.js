const page = (state = 1, action) => {
  switch (action.type) {
    case 'PAGE_CHANGE':
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
}

export default page;