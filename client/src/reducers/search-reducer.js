import { SORT } from '../actions/types'

export default function(state=null, action) {
  switch(action.type) {
    case SORT:
      return action.payload
  }
  return state
}
