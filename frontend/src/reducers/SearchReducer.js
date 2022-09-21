import { SEARCH } from "../actions/actions";

const searchReducer = (state = [{searchTerm: '', category:'', priceSort: '', page:''}], action) => {
  switch (action.type){
    case SEARCH:
      const search = action.payload
      console.log(action.payload)
      return [search]
    
    default:
      return state
  }
}

export default searchReducer