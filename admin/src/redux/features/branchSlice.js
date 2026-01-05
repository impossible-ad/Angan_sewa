import { indexSlice } from "./indexSlice";

export const branchAPIs = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBranchs: builder.query({
      query: () => ({
        url: "/branch/getallbranch",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    deleteBranch: builder.mutation({
      query: (branch_id) => ({
        url: `/branch/deletebranch/${branch_id}`,
        method: "DELETE",
        body: branch_id,
      }),
      invalidatesTags: ["branch"],
    }),
    addBranch: builder.mutation({
      query: (data) => ({
        url: "/branch/addbranch",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    
  }),
});

export const {
  useGetAllBranchsQuery,
  useDeleteBranchMutation,
  useAddBranchMutation,
} = branchAPIs;
