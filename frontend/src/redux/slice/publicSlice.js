import { indexSlice } from "./indexSlice";

export const publicAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: "public/getallservices",
        method: "GET",
      }),
      providesTags: ["public"],
    }),
    getDistricts: builder.query({
      query: () => ({
        url: "branch/getalldistrict",
        method: "GET",
      }),
      providesTags: ["public"],
    }),
  }),
});
export const { useGetDistrictsQuery, useGetServicesQuery } = publicAPIs;
