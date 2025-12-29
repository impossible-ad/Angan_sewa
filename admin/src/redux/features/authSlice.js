import { indexSlice } from "./indexSlice";

export const authAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: () => ({
        url: "/auth/login",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),

    signout: builder.mutation({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
      invalidatesTag: ["auth"],
    }),
  }),
});

export const { useLoginMutation, useSignoutMutation } = authAPIs;
