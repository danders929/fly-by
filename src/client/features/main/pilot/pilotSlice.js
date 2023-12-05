import api from "../../../store/api";

const pilotApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPilot: builder.query({
      query: (id) => `/pilots/${id}`,
      providesTags: ["Pilot"],
    }),

    createPilot: builder.mutation({
      query: (pilotData) => ({
        url: `/pilots/`,
        method: "POST",
        body: studentData,
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