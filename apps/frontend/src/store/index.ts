import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authApi from "./apis/authApi";
import errorMiddleware from "./apis/errorMiddleware";
import profileApi from "./apis/profileApi";
import weatherApi from "./apis/weatherApi";
import tokenSlide from "./slices/tokenSlide";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    token: tokenSlide.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    [
      ...getDefaultMiddleware()
        .concat(errorMiddleware)
        .concat(authApi.middleware)
        .concat(profileApi.middleware)
        .concat(weatherApi.middleware),
    ] as any,
});

setupListeners(store.dispatch);

export default store;

export const { useLoginMutation, useRegisterMutation } = authApi;
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadCvMutation,
} = profileApi;
export const { useGetCurretWeatherQuery, useGetForecatsQuery } = weatherApi;
