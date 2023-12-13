import { createSlice } from "@reduxjs/toolkit";
import api from "../../../store/api";

const aircraftApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAircraft: builder.query({
      query: () => ({
        url: `/aircraft/`
      }),
      providesTags: ["Aircraft"],
    }),

    createAircraft: builder.mutation({
      query: (aircraftData) => ({
        url: `/aircraft/`,
        method: "POST",
        body: aircraftData,
      }),
    }),

    updateAircraft: builder.mutation({
      query: (aircraftData) => ({
        url: `/aircraft/${aircraftData.id}`,
        method: "PATCH",
        body: aircraftData,
      }),
      invalidatesTags: ["Aircraft"],
    }),
  }),
});

export const {
  useGetAircraftQuery,
  useCreateAircraft,
  useUpdateAircraft,
} = aircraftApi;

const aircraftSlice = createSlice({
  name: "aircraft",
  initialState: {
    id: "",
    makeModel: "",
    tailNum: "",
  },
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setMakeModel: (state, action) => {
      state.makeModel = action.payload;
    },
    setTailnum: (state, action) => {
      state.tailNum = action.payload;
    },
    resetAircraft: (state) => {
      state.id = "";
      state.makeModel = "";
      state.tailNum = "";
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(aircraftApi.endpoints.getAircraft.matchFulfilled, (state, action) => {
      state.id = action.payload.id
      state.makeModel = action.payload.makeModel;
      state.tailNum = action.payload.tailNum;
    });
  },
});