import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import flightReducer from "../features/main/pilot/flightLogSlice"
import flightTimeReducer, { calculateDayFlightDuration, calculateFlightDuration, calculateNightFlightDuration } from "../features/main/pilot/flightTimesSlice"
import api from "./api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    flight: flightReducer,
    flightTime: flightTimeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
// sets up an interval to dispatch the flight duration actions every minute
setInterval(() => {
  store.dispatch(calculateFlightDuration());
  store.dispatch(calculateDayFlightDuration());
  store.dispatch(calculateNightFlightDuration());
}, 60000);

export default store;
