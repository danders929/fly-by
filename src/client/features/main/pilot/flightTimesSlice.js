import api from "../../../store/api";
import { useSelector } from "react-redux";
import { selectId } from "../../auth/authSlice";

const usrId = useSelector(selectId)

const flightTimesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getflightTime: builder.query({
      query: () => ({
        url: `/flightTimes/`,
        params: { picId: usrId }
      }),
      providesTags: ["FlightTime"],
    }),

    createflightTime: builder.mutation({
      query: (flightTimeData) => ({
        url: `/flightTimes/`,
        method: "POST",
        body: flightTimeData,
      }),
    }),

    updateFlightTime: builder.mutation({
      query: (flightTimeData) => ({
        url: `/flightTimes/${flightTimeData.id}`,
        method: "PATCH",
        body: flightTimeData,
      }),
      invalidatesTags: ["FlightTime"],
    }),
  }),
});

export const {
  useGetFlightTimesQuery,
  useCreateFlightTimes,
  useUpdateFlightTimes,
} = flightTimesApi;