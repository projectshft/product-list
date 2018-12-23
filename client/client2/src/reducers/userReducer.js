import {LOGIN} from './actions/login'

const userReducer = (state = {token:""} , action) => {
  let {type} = action
  switch (type) {
    case LOGIN:
    state.token = action.payload
      return state
    default:
      return state
  }
}

export default userReducer