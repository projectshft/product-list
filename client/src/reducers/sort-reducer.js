import { SORT } from '../actions'

export default function sort(state=null, action) {
  switch(action.type) {
    case SORT:
      return action.payload
  }
  return state
}
