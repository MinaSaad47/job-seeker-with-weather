import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { z } from "zod";
import { ValidateProfile } from "../../validations/profile.validation";

const profileApi = createApi({
  reducerPath: "profile",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/profile",
    prepareHeaders: (headers, { getState: _ }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getProfile: build.query<any, void>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateProfile: build.mutation<any, z.infer<typeof ValidateProfile>>({
      query: (body) => ({
        url: "/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
    uploadCv: build.mutation<any, File>({
      query: (file: File) => {
        const formData = new FormData();
        formData.append("cv", file);
        return {
          url: "/upload-cv",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export { profileApi };
