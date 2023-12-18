import { createSlice } from "@reduxjs/toolkit";
import api from "../../../store/api";

const aircraftApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAircraftById: builder.query({
      query: (aircraftId) => ({
        url: `/aircraft/${aircraftId}`,
      }),
      providesTags: ["Aircraft"],
    }),

    getAircraft: builder.query({
      query: () => ({
        url: `/aircraft/`,
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

export const useGetAircraftByIdQuery =
  aircraftApi.endpoints.getAircraftById.useQuery;
export const useGetAircraftQuery = aircraftApi.endpoints.getAircraft.useQuery;
export const useCreateAircraft =
  aircraftApi.endpoints.createAircraft.useMutation;
export const useUpdateAircraft =
  aircraftApi.endpoints.updateAircraft.useMutation;

const aircraftSlice = createSlice({
  name: "aircraft",
  initialState: {
    id: 0,
    makeModel: "",
    tailNum: "",
    singleEngine: null,
    hobbs: 0.0,
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
    setSingleEngine: (state, action) => {
      state.singleEngine = action.payload;
    },
    setHobbs: (state, action) => {
      state.hobbs = action.payload;
    },
    resetAircraft: (state) => {
      state.id = "";
      state.makeModel = "";
      state.tailNum = "";
      state.singleEngine = null;
      state.hobbs = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      aircraftApi.endpoints.getAircraft.matchFulfilled,
      (state, action) => {
        state.id = action.payload.id;
        state.makeModel = action.payload.makeModel;
        state.tailNum = action.payload.tailNum;
      }
    );
    builder.addMatcher(
      aircraftApi.endpoints.getAircraftById.matchFulfilled,
      (state, action) => {
        state.id = action.payload.id;
        state.makeModel = action.payload.makeModel;
        state.tailNum = action.payload.tailNum;
        state.singleEngine = action.payload.singleEngine;
        state.hobbs = action.payload.hobbs;
      }
    );
  },
});
