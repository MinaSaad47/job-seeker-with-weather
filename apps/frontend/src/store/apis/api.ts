import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { z } from "zod";
import {
  ValidateLogin,
  ValidateRegister,
} from "../../validations/auth.validation";
import { ValidateProfile } from "../../validations/profile.validation";
import { setToken } from "../slices/tokenSlide";

const api = createApi({
  reducerPath: "api",
  tagTypes: ["Profile", "Weather"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }: { getState: any }) => {
      const { token } = getState().token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, z.infer<typeof ValidateLogin>>({
      query: (body) => {
        return {
          url: "/auth/login",
          method: "POST",
          body,
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setToken(data.data));
      },
    }),
    register: builder.mutation<any, z.infer<typeof ValidateRegister>>({
      query: (body) => {
        return {
          url: "/auth/register",
          method: "POST",
          body,
        };
      },
    }),
    getProfile: builder.query<any, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<any, z.infer<typeof ValidateProfile>>({
      query: (body) => ({
        url: "/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile", "Weather"],
    }),
    uploadCv: builder.mutation<any, File>({
      query: (file: File) => {
        const formData = new FormData();
        formData.append("cv", file);
        return {
          url: "/profile/upload-cv",
          method: "POST",
          body: formData,
        };
      },
    }),
    uploadPicture: builder.mutation<any, File>({
      query: (file: File) => {
        const formData = new FormData();
        formData.append("picture", file);
        return {
          url: "/profile/upload-picture",
          method: "POST",
          body: formData,
        };
      },
    }),
    getCurretWeather: builder.query<any, void>({
      query: () => ({
        url: "/weather/current",
        method: "GET",
      }),
      providesTags: ["Weather"],
    }),
    getForecats: builder.query<any, void>({
      query: () => ({
        url: "/weather/forecast",
        method: "GET",
      }),
      providesTags: ["Weather"],
    }),
  }),
});

export default api;
