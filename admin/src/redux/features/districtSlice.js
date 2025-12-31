import { indexSlice } from "./indexSlice";

export const districtAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDistricts: builder.query({
      query: () => ({
        url: "/branch/getalldistrict",
        method: "GET",
      }),
      providesTags: ["district"],
    }),
  }),
});

export const { useGetAllDistrictsQuery } = districtAPIs;
