import { indexSlice } from "./indexSlice";

export const provinceAPI = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProvinces: builder.query({
      query: (data) => ({
        url: "/branch/getallprovince",
        method: "GET",
        body: data,
      }),
      providesTags: ["Province"],
    }),
  }),
});

export const { useGetAllProvincesQuery } = provinceAPI;
