import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const weatherApi = createApi({
  reducerPath: "weather",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/weather",
    prepareHeaders: (headers, { getState }: { getState: any }) => {
      const { token } = getState().token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCurretWeather: builder.query<any, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
    getForecats: builder.query<any, void>({
      query: () => ({
        url: "/forecast",
        method: "GET",
      }),
    }),
  }),
});

export default weatherApi;
