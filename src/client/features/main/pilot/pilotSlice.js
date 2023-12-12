import { createSlice } from "@reduxjs/toolkit";
import api from "../../../store/api";

const pilotApi = api.injectEndpoints({
  endpoints: (builder) => ({
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

export const {
  useGetPilotQuery,
  useCreatePilot,
  useUpdatePilot,
} = pilotApi;

const pilotSlice = createSlice({
  name: "pilot",
  initialState: {
    firstName: "",
  },
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    resetPilot: (state) => {
      state.firstName = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(pilotApi.endpoints.getPilot.matchFulfilled, (state, action) => {
      state.firstName = action.payload.firstName;
      // Update other properties if needed
    });
  },
});

export const { setFirstName } = pilotSlice.actions;
export const selectFirstName = (state) => state.pilot.firstName;

export default pilotSlice.reducer;
