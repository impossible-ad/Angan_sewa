import { indexSlice } from "./indexSlice";

export const authAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),

    signout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),

    getBManager: builder.query({
      query: () => ({
        url: "/auth/getbranchmanager",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    addBManager: builder.mutation({
      query: (data) => ({
        url: "/auth/addbranchmanager",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    deletebManager: builder.mutation({
      query: (id) => ({
        url: `/auth/deletebranchmanager/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["auth"],
    }),
    editbManager: builder.mutation({
      query: (id) => ({
        url: `/auth/editbranchmanager/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["auth"],
    }),
    getAllPDB: builder.query({
      query: ({ province_id, district_id } = {}) => ({
        url: `/auth/getallpdb/?${
          province_id ? `province_id=${province_id}` : ""
        }${district_id ? `&district_id=${district_id}` : ""}`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
    verifyToken: builder.query({
      query: () => ({
        url: "/auth/verifytoken",
        method: "GET",
      }),
      validatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignoutMutation,
  useGetBManagerQuery,
  useAddBManagerMutation,
  useDeletebManagerMutation,
  useEditbManagerMutation,
  useGetAllPDBQuery,
  useVerifyTokenQuery,
} = authAPIs;
