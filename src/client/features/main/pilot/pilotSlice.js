import api from "../../../store/api";
import { useSelector } from "react-redux";
import { selectId } from "../../auth/authSlice";

const usrId = useSelector(selectId)

const pilotApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPilot: builder.query({
      query: (id) => `/pilots/${usrId}`,
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