import { createSlice } from "@reduxjs/toolkit";
import api from "../../../store/api";

const flightTimesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getflightTime: builder.query({
      query: () => ({
        url: `/flightTimes/`,
        params: { flightId: flightId }
      }),
      providesTags: ["FlightTime"],
    }),

    createflightTime: builder.mutation({
      query: (flightTimeData) => ({
        url: `/flightTimes/`,
        method: "POST",
        body: flightTimeData,
      }),
    }),

    updateFlightTime: builder.mutation({
      query: (flightTimeData) => ({
        url: `/flightTimes/${flightTimeData.id}`,
        method: "PATCH",
        body: flightTimeData,
      }),
      invalidatesTags: ["FlightTime"],
    }),
  }),
});

export const useGetFlightTimesQuery = flightTimesApi.endpoints.getflightTime.useQuery;
export const useUpdateFlightTimes = flightTimesApi.endpoints.updateFlightTime.useMutation;
export const useCreateFlightTimes = flightTimesApi.endpoints.createflightTime.useMutation;

const INITIAL_FLIGHT_START = "initialFlightTimeStart"
const FLIGHT_START = "flightTimeStart"
const FLIGHT_STOP = "flightTimeStop"
const FLIGHT_DAY = "dayFlight"

// Reducer that stores the payloads Flight time start in state and session storage
const storeInitialFlightTimeStart = (state, { payload }) => {
  state.flightTimeStart = payload.flightTimeStart;
  sessionStorage.setItem(INITIAL_FLIGHT_START, payload.flightTimeStart);
}

// Reducer that stores the payloads Flight time start in state and session storage
const storeFlightTimeStart = (state, { payload }) => {
  state.flightTimeStart = payload.flightTimeStart;
  sessionStorage.setItem(FLIGHT_START, payload.flightTimeStart);
}

// Reducer that stores the payloads Flight time stop in state and session storage
const storeFlightTimeStop = (state, { payload }) => {
  state.flightTimeStop = payload.flightTimeStop;
  sessionStorage.setItem(FLIGHT_STOP, payload.flightTimeStop);
}

// Reducer that stores whether or not the current flight time tracking is for day/night in state and session storage
const storeDayFlight = (state, { payload }) => {
  state.dayFlight = payload.dayFlight;
  sessionStorage.setItem(FLIGHT_DAY, payload.dayFlight)
}

const flightTimeSlice = createSlice({
  name: "flightTime",
  initialState: {
    flightTimeStart: "",
    flightTimeStop: "",
    dayFlight: true,
    flightDuration: 0.00,
    dayFlightDuration: 0.00,
    nightFlightDuration: 0.00,
  },
  reducers: {
    // Reducer that calculates the difference between flightTimeStart and current time
    calculateFlightDuration : (state) => {
      // Retrieve flightTimeStart from session storage
      const flightTimeStart = sessionStorage.getItem(INITIAL_FLIGHT_START);
    
      // Check if flightTimeStart exists
      if (flightTimeStart) {
        const currentTime = new Date();
        const startTime = new Date(flightTimeStart);
    
        // Calculate the difference in minutes
        const timeDifferenceInMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
    
        // Format the duration as "HH.00"
        const hours = Math.floor(timeDifferenceInMinutes / 60);
        const formattedDuration = `${hours}.00`;
    
        // Update the state with the formatted duration
        state.flightDuration = formattedDuration;
      }
    },
    // Reducer that calculates the difference between dayFlightTimeStart and current time
    calculateDayFlightDuration : (state) => {
      const flightTimeStart = sessionStorage.getItem(FLIGHT_START);
      const isDayflight = sessionStorage.getItem(FLIGHT_DAY);
    
      // Check if flightTimeStart exists
      if (flightTimeStart && isDayflight) {
        const currentTime = new Date();
        const startTime = new Date(flightTimeStart);
    
        // Calculate the difference in minutes
        const timeDifferenceInMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
    
        // Format the duration as "HH.00"
        const hours = Math.floor(timeDifferenceInMinutes / 60);
        const formattedDuration = `${hours}.00`;
    
        // Update the state with the formatted duration
        state.dayFlightDuration += formattedDuration;
      }
    },

    calculateNightFlightDuration : (state) => {
      const flightTimeStart = sessionStorage.getItem(FLIGHT_START);
      const isDayflight = sessionStorage.getItem(FLIGHT_DAY);
    
      // Check if flightTimeStart exists
      if (flightTimeStart && !isDayflight) {
        const currentTime = new Date();
        const startTime = new Date(flightTimeStart);
    
        // Calculate the difference in minutes
        const timeDifferenceInMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
    
        // Format the duration as "HH.00"
        const hours = Math.floor(timeDifferenceInMinutes / 60);
        const formattedDuration = `${hours}.00`;
    
        // Update the state with the formatted duration
        state.nightFlightDuration += formattedDuration;
      }
    }
  },
});

export const { calculateFlightDuration, calculateDayFlightDuration, calculateNightFlightDuration } = flightTimeSlice.actions;

export const selectFlightDuration = (state) => state.flightDuration;
export const selectDayFlightDuration = (state) => state.dayFlightDuration;
export const selectNightFlightDuration = (state) => state.nightFlightDuration;

export default flightTimeSlice.reducer;