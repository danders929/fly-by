import { createSlice } from "@reduxjs/toolkit";
import api from "../../../store/api";

export const flightLogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getflight: builder.query({
      query: (usrId) => ({
        url: `/flights/`,
        params: { where: { OR: [{ picId: usrId }, { sicId: usrId }] } },
      }),
      providesTags: ["Flight"],
    }),
    createflight: builder.mutation({
      query: (flightData) => ({
        url: `/flights/`,
        method: "POST",
        body: flightData,
      }),
    }),
    updateFlight: builder.mutation({
      query: (flightData) => ({
        url: `/flights/${flightData.id}`,
        method: "PATCH",
        body: flightData,
      }),
      invalidatesTags: ["Flight"],
    }),
  }),
});

export const useGetFlightQuery = flightLogApi.endpoints.getflight.useQuery;
export const useCreateFlight = flightLogApi.endpoints.createflight.useMutation;
export const useUpdateFlight = flightLogApi.endpoints.updateFlight.useMutation;

const FLIGHT_ID = "flightId";
const ENG_START = "engineStartTime";
const ENG_STOP = "engineStopTime";

const storeFlightId = (state, { payload }) => {
  state.flightId = payload.id;
  sessionStorage.setItem(FLIGHT_ID, payload.id);
};

const storeEngineStart = (state, { payload }) => {
  state.engineStartTime = payload.engineStartTime;
  sessionStorage.setItem(ENG_START, payload.engineStartTime);
};

const storeEngineStop = (state, { payload }) => {
  state.engineStopTime = payload.engineStopTime;
  sessionStorage.setItem(ENG_STOP, payload.engineStopTime);
};

const flightLogSlice = createSlice({
  name: "flight",
  initialState: {
    id: sessionStorage.getItem(FLIGHT_ID),
    engineStartTime: sessionStorage.getItem(ENG_START),
    flights: [], // New array to store flights
  },
  reducers: {
    updateFlightData: (
      state,
      { payload: { flightId, solo, picId, sicId, aircraftId, engineStartTime, departure, arrival, engineStopTime } }
    ) => {
      return {
        type: "updateFlightData",
        payload: {
          flightId,
          solo,
          picId,
          sicId,
          aircraftId,
          engineStartTime,
          departure,
          arrival,
          engineStopTime,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      flightLogApi.endpoints.getflight.matchFulfilled,
      (state, action) => {
        // Store the fetched flights in the state
        state.flights = action.payload;
      }
    );

    builder.addMatcher(
      flightLogApi.endpoints.createflight.matchFulfilled,
      storeFlightId,
      storeEngineStart,
      storeEngineStop
    );

    builder.addMatcher(
      flightLogApi.endpoints.updateFlight.matchFulfilled,
      storeFlightId,
      storeEngineStart,
      storeEngineStop
    );
  },
});

export const { updateFlightData } = flightLogSlice.actions;

export const selectFlightId = (state) => state.flight.id;
export const selectEngineStartTime = (state) => state.flight.engineStartTime;
export const selectEngineStopTime = (state) => state.flight.engineStopTime;
export const selectFlights = (state) => state.flight.flights;

export default flightLogSlice.reducer;