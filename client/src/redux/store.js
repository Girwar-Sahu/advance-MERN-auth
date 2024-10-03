import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import authAPI from "./api/apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});

export default store;
