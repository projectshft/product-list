// import {LOGIN} from './actions/login'

const userReducer = (state = {} , action) => {
  let {type} = action
  switch (type) {
    case "LOGIN":
    if(!action.payload.error){
    state = action.payload
      }
      return state
    default:
      return state
  }
}

export default userReducer