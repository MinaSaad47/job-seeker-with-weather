import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import api from "./apis/api";
import errorMiddleware from "./apis/errorMiddleware";
import tokenSlide, { removeToken, setToken } from "./slices/tokenSlide";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    token: tokenSlide.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(errorMiddleware).concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
export { setToken, removeToken };
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadPictureMutation,
  useUploadCvMutation,
  useGetCurretWeatherQuery,
  useGetForecatsQuery,
} = api;
