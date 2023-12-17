import { createSlice } from "@reduxjs/toolkit";
import api from "../../../store/api";

const pilotApi = api.injectEndpoints({
  
  endpoints: (builder) => ({
    getPilotList: builder.query({
      query: () => `/pilots/`,
      providesTags: ["Pilots"],
    }),

    getPilot: builder.query({
      query: (usrId) => `/pilots/${usrId}`,
      providesTags: ["Pilot"],
    }),

    createPilot: builder.mutation({
      query: (pilotData) => ({
        url: `/pilots/`,
        method: "POST",
        body: pilotData,
      }),
    }),

    updatePilot: builder.mutation({
      query: (pilotData) => ({
        url: `/pilots/${pilotData.id}`,
        method: "PATCH",
        body: pilotData,
      }),
      invalidatesTags: ["Pilot"],
    }),
  }),
});

export const useCreatePilot = pilotApi.endpoints.createPilot.useMutation;
export const   useUpdatePilot = pilotApi.endpoints.updatePilot.useMutation;
export const {
  useGetPilotListQuery,
  useGetPilotQuery,
} = pilotApi;

//** Session storage key for firstName and pilotId */
const FIRST_NAME = "firstName";
const LAST_NAME = "lastName"
const PILOT_ID = "pilotId";

//** Reducer that stores payloads FirstName, and pilotId */
const storePilotDetails = (state, { payload }) => {
  state.firstName = payload.firstName;
  state.lastName = payload.lastName;
  state.pilotId = payload.id;
  sessionStorage.setItem(FIRST_NAME, payload.firstName);
  sessionStorage.setItem(LAST_NAME, payload.lastName)
  sessionStorage.setItem(PILOT_ID, payload.id);
}

const pilotSlice = createSlice({
  name: "pilot",
  initialState: {
    firstName: sessionStorage.getItem(FIRST_NAME),
    lastName: sessionStorage.getItem(LAST_NAME),
    pilotId: sessionStorage.getItem(PILOT_ID),
  },
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setPilotId: (state, action) => {
      state.pilotId = action.payload;
    },
    resetPilot: (state) => {
      state.firstName = "";
      state.pilotId = "";
      sessionStorage.removeItem(FIRST_NAME);
      sessionStorage.removeItem(PILOT_ID);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(pilotApi.endpoints.getPilot.matchFulfilled, storePilotDetails);
  },
});

export const { setFirstName, setLastName, setPilotId } = pilotSlice.actions;
export const selectFirstName = (state) => state.pilot.firstName;
export const selectLastName = (state) => state.pilot.lastName;
export const selectPilotId = (state) => state.pilot.pilotId;

export default pilotSlice.reducer;
