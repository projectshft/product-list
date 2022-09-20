import { configureStore  } from "@reduxjs/toolkit";
import promise from "redux-promise";
import reducer from "./reducer";

const store = configureStore({
  reducer: {reducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(promise),
});

export default store;
