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