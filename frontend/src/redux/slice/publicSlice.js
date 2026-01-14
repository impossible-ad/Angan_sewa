import { indexSlice } from "./indexSlice";

export const publicAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: (branch_id) => ({
        url: `public/getallservices/${branch_id}`,
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
    getAllPDB: builder.query({
      query: ({ district_id } = {}) => ({
        url: `/auth/getallpdb/?
        }${district_id ? `&district_id=${district_id}` : ""}`,
        method: "GET",
      }),
      providesTags: ["public"],
    }),
  }),
});
export const { useGetDistrictsQuery, useGetServicesQuery, useGetAllPDBQuery } =
  publicAPIs;
