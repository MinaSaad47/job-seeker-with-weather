import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authApi from "./apis/authApi";
import errorMiddleware from "./apis/errorMiddleware";
import { profileApi } from "./apis/profileApi";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    [
      ...getDefaultMiddleware()
        .concat(errorMiddleware)
        .concat(authApi.middleware)
        .concat(profileApi.middleware),
    ] as any,
});

setupListeners(store.dispatch);

export default store;

export const { useLoginMutation, useRegisterMutation } = authApi;
export const { useGetProfileQuery, useUpdateProfileMutation, useUploadCvMutation } = profileApi;
