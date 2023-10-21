import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type TokenState = {
  token?: string;
};

const initialState: TokenState = {
  token: Cookies.get("token"),
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      Cookies.set("token", action.payload, {
        sameSite: "strict",
        secure: true,
      });
      state.token = action.payload;
    },
    removeToken: (state) => {
      Cookies.remove("token");
      state.token = undefined;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice;
