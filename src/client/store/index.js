import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import flightReducer from "../features/main/pilot/flightLogSlice"
import flightTimeReducer from "../features/main/pilot/flightTimesSlice"
import pilotReducer from "../features/main/pilot/pilotSlice";
import api from "./api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    flight: flightReducer,
    flightTime: flightTimeReducer,
    pilot: pilotReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
