import { createSlice } from "@reduxjs/toolkit";
import api from "../../store/api";
import resetPilot from "../main/pilot/pilotSlice";
import { resetFlightLog } from "../main/pilot/flightLogSlice";

/** Authentication endpoints */
const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response) => response.data,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

/** Session storage key for auth token */
const TOKEN_KEY = "token";
const USER_ID = "userId"

/** Reducer that stores payload's token in state and session storage */
const storeToken = (state, { payload }) => {
  state.token = payload.token;
  sessionStorage.setItem(TOKEN_KEY, payload.token);
  sessionStorage.setItem(USER_ID, payload.userId);
};

/** Keeps track of JWT sent from API */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: sessionStorage.getItem(TOKEN_KEY),
    id: sessionStorage.getItem(USER_ID),
  },
  reducers: {
    /** Logging out means wiping the stored token */
    logout: (state) => {
      state.token = null;
      state.id = null;
      sessionStorage.removeItem(TOKEN_KEY);
    },
  },
  extraReducers: (builder) => {
    // Additional reducers that reset the state when logging out
    builder.addCase(logout, (state) => {
      resetPilot(state);
      resetFlightLog(state);
    });
    // Store token when register or login succeeds
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectId = (state) => state.auth.id;

export default authSlice.reducer;
