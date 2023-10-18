import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authApi from "./apis/authApi";
import errorMiddleware from "./apis/errorMiddleware";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    errorMiddleware,
    ...getDefaultMiddleware().concat(authApi.middleware),
  ],
});

setupListeners(store.dispatch);

export default store;

export const { useLoginMutation, useRegisterMutation } = authApi;
