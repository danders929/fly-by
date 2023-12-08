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