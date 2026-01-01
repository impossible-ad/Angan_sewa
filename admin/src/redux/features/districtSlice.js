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

    addDistrict: builder.mutation({
      query: (newDistrict) => ({
        url: "/branch/adddistrict",
        method: "POST",
        body: newDistrict,
      }),
      invalidatesTags: ["district"],
    }),
    deleteDistrict: builder.mutation({
      query: (district_id) => ({
        url: `/branch/deletedistrict/${district_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["district"],
    }),
  }),
});

export const {
  useGetAllDistrictsQuery,
  useAddDistrictMutation,
  useDeleteDistrictMutation,
} = districtAPIs;
