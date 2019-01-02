import {FILTER_BY_CATEGORY} from '../actions'

export default function(state=null, action) {
    switch (action.type) {
      case FILTER_BY_CATEGORY:
        return action.payload
    }
    return state
  }