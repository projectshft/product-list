import {GENERATE_FAKE_DATA} from '../actions/types'

export default function(state=null, action) {
  switch (action.type) {
    case GENERATE_FAKE_DATA:
      return action.payload
  }
  return state
}