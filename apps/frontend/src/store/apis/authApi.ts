import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";
import {
  ValidateLogin,
  ValidateRegister,
} from "../../validations/auth.validation";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
  }),

  endpoints(builder) {
    return {
      login: builder.mutation<any, z.infer<typeof ValidateLogin>>({
        query: (body) => {
          return {
            url: "/login",
            method: "POST",
            body,
          };
        },
      }),
      register: builder.mutation<any, z.infer<typeof ValidateRegister>>({
        query: (body) => {
          return {
            url: "/register",
            method: "POST",
            body,
          };
        },
      }),
    };
  },
});

export default authApi;