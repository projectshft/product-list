import { combineReducers } from "redux";
import DestinationReducer from "./reducer-destination";
import DistanceReducer from "./reducer-send-dest";

const rootReducer = combineReducers({
    destinations: DestinationReducer,
    distance: DistanceReducer,
  });
  
  export default rootReducer;