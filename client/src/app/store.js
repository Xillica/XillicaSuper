import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/index";

const userFromLocalStorage =
  JSON.parse(localStorage.getItem("profile")) || null;

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    auth: {
      authData: userFromLocalStorage,
    },
  },
});

export default store;
