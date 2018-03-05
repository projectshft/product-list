import { GET_COUNT } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case GET_COUNT:
      const count = action.payload.data.count
      const pages = parseInt(count) / 9
      const pageArray = Array(pages).fill().map((e,i)=>i+1)
      return pageArray
  }

    return state
}
