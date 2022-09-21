import { SEARCH } from "../actions/actions";

const initialState = {
  searchTerm: ''
}

const searchReducer = (state = initialState, action) => {
  switch (action.type){
    case SEARCH:
      return state
    
    default:
      return state
  }
}

export default searchReducer