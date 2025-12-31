import { indexSlice } from "./indexSlice";

export const provinceAPI = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProvinces: builder.query({
      query: () => ({
        url: "/branch/getallprovince",
        method: "GET",
      }),
      providesTags: ["province"],
    }),

    addProvince: builder.mutation({
      query: (newProvince) => ({
        url: "/branch/addprovince",
        method: "POST",
        body: newProvince,
      }),
      invalidatesTags: ["province"],
    }),

    deleteProvince: builder.mutation({
      query: (province_id) => ({
        url: `/branch/deleteprovince/${province_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["province"],
    }),
  }),
});

export const {
  useGetAllProvincesQuery,
  useAddProvinceMutation,
  useDeleteProvinceMutation,
} = provinceAPI;
