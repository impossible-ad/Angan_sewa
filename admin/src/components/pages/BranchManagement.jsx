import { toast } from "react-toastify";
import {
  useAddBranchMutation,
  useDeleteBranchMutation,
  useGetAllBranchsQuery,
} from "../../redux/features/branchSlice";
import Loading from "../shared/IsLoading";
import Select from "../shared/Select";
import { useGetAllDistrictsQuery } from "../../redux/features/districtSlice";
import { useState } from "react";

const BranchManagement = () => {
  const {
    data: branchData,
    isLoading: branchLoading,
    isError,
    error,
  } = useGetAllBranchsQuery();

  const [deleteBranch] = useDeleteBranchMutation();
  const [addBranch] = useAddBranchMutation();
  const { data: districtData, isLoading: disLoading } =
    useGetAllDistrictsQuery();
  const [formData, setFormData] = useState({
    branch_name: "",
    district_id: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.branch_name || !formData.district_id) {
        toast.error("Please fill all the fields");
        return;
      }
      const res = await addBranch(formData).unwrap();
      toast.success(res.message || "Branch added successfully");
      setFormData({
        branch_name: "",
        district_id: "",
        remarks: "",
      });
    } catch (error) {
      toast.error(error.data?.message || "Failed to add branch");
    }
  };

  const handleDelete = async (branch_id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    try {
      await deleteBranch(branch_id).unwrap();
      toast.success("Branch deleted successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete branch");
    }
  };
  const actionOptions = [{ label: "Delete", value: "delete" }];
  const action = { delete: handleDelete };

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error: {error?.data?.message || "Failed to load branches"}
        </div>
      </div>
    );
  }
  if (branchLoading) {
    return <Loading loading={branchLoading} />;
  }
  const branch = branchData?.data || [];
  const district = districtData?.data || [];
  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-auto">
      {/* Header */}
      <div className="p-4 md:p-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Branch Management</h1>
        <p className="text-gray-600 mt-2">Manage branches</p>
      </div>
      <div className="px-4 md:px-8 pb-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800">Add Branch</h2>
        </div>
      </div>
      {/* Add Branch Form */}
      <div className="px-4 md:px-8 pb-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Add Branch
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    name="branch_name"
                    id="branch_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter branch name"
                    value={formData.branch_name || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* District Dropdown  */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select district
                  </label>
                  <select
                    id="district_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    value={formData.district_id}
                    onChange={handleChange}
                  >
                    <option value="">-- Choose District --</option>
                    {district.map((dist) => (
                      <option key={dist.district_id} value={dist.district_id}>
                        {dist.district_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks
                  </label>
                  <input
                    type="text"
                    name="remarks"
                    id="remarks"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add description"
                    value={formData.remarks || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                Add Branch
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Branch Table - Full Width */}
      <div className="px-4 md:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Branch List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Branch ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Branch Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Remarks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    District Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {branch.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No branches found
                    </td>
                  </tr>
                ) : (
                  branch.map((branch) => (
                    <tr key={branch.branch_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {branch.branch_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {branch.branch_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {branch.remarks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {branch.district_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Select
                          options={actionOptions}
                          actions={action}
                          itemId={branch.branch_id}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Total branches:{" "}
              <span className="font-semibold">{branch.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchManagement;
