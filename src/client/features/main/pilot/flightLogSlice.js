import { createSlice } from "@reduxjs/toolkit";
import api from "../../../store/api";
import { useSelector } from "react-redux";
import { selectId } from "../../auth/authSlice";

const usrId = useSelector(selectId)

const flightLogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getflight: builder.query({
      query: () => ({
        url: `/flights/`,
        params: { where: { OR: [{ picId: usrId }, { sicId: usrId }] } }
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

export const {
  useGetFlightQuery,
  useCreateFlight,
  useUpdateFlight,
} = flightLogApi;

// Session storage key for Flight Id
const FLIGHT_ID = "flightId";
const ENG_START = "engineStartTime";
const ENG_STOP = "engineStopTime";

// reducer that stores the payload's id in state and session storage
const storeFlightId = (state, { payload }) => {
  state.flightId = payload.id;
  sessionStorage.setItem(FLIGHT_ID, payload.id);
}

// reducer that stores the payload's start time in state
const storeEngineStart = (state, {payload}) => {
  state.engineStartTime = payload.engineStartTime;
  sessionStorage.setItem(ENG_START, payload.engineStartTime);
}

// reducer that stores the payload's stop time in state
const storeEngineStop = (state, {payload}) => {
  state.engineStopTime = payload.engineStopTime;
  sessionStorage.setItem(ENG_STOP, payload.engineStopTime);
}

// keeps track of Flight data from API
const flightLogSlice = createSlice({
  name: "flight",
  initialState: {
    id: sessionStorage.getItem(FLIGHT_ID),
    engineStartTime: sessionStorage.getItem(ENG_START),
    engineStopTime: sessionStorage.getItem(ENG_STOP),
  },
  reducers: {
    // takes engine start/stop time and converts ISO8601 string to date() object
    convertTimeStampToDate: (state) => {
      state.engineStartTime = new Date(state.engineStartTime);
      state.engineStopTime = new Date(state.engineStopTime);
    },

    // Updates the payload data
    updateFlightData: (flightId, solo, picId, sicId, aircraftId, engineStartTime, departure, arrival, engineStopTime) => {
      return {
        type: 'updateFlightData',
        payload: {
          flightId,
          solo,
          picId,
          sicId,
          aircraftId,
          engineStartTime,
          departure,
          arrival,
          engineStopTime
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Store flight data when querying a flight
    builder.addMatcher(api.endpoints.getflight.matchFulfilled, storeFlightId, storeEngineStart, storeEngineStop)
    
    // Store Flight data when creating a flight
    builder.addMatcher(api.endpoints.createflight.matchFulfilled, storeFlightId, storeEngineStart, storeEngineStop)

    // Updates state when updating flight data
    builder.addMatcher(api.endpoints.updateFlight.matchFulfilled, storeFlightId, storeEngineStart, storeEngineStop)
  }
})

export const { convertTimeStampToDate, updateFlightData } = flightLogSlice.actions;

export const selectFlightId = (state) => state.flight.id;
export const selectEngineStartTime = (state) => state.flight.engineStartTime;
export const selectEngineStopTime = (state) => state.flight.engineStopTime;

export default flightLogSlice.reducer;