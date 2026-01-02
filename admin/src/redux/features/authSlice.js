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
  }),
});

export const { useLoginMutation, useSignoutMutation, useGetBManagerQuery } =
  authAPIs;
