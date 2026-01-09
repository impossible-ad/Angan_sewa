import { toast } from "react-toastify";
import {
  useAddBranchMutation,
  useDeleteBranchMutation,
  useGetAllBranchsQuery,
} from "../../redux/features/branchSlice";
import Loading from "../shared/IsLoading";
import Select from "../shared/Select";
import { useState } from "react";
import Input from "../shared/Input";
import { useGetAllProvincesQuery } from "../../redux/features/provinceSlice";
import { useGetAllPDBQuery } from "../../redux/features/authSlice";
import DetailsModal from "../shared/Modal";

const BranchManagement = () => {
  const {
    data: branchData,
    isLoading: branchLoading,
    isError,
    error,
  } = useGetAllBranchsQuery();

  const [deleteBranch] = useDeleteBranchMutation();
  const [addBranch] = useAddBranchMutation();
  const [province_id, setProvinceId] = useState("");
  const { data: districts } = useGetAllPDBQuery(
    { province_id },
    { skip: !province_id }
  );
  const { data: provinceData, isLoading: provLoading } =
    useGetAllProvincesQuery();
  const [viewModal, setViewModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

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
  const handleActionChange = (e, branch) => {
    if (e.target.value === "delete") {
      handleDelete(branch.branch_id);
    } else if (e.target.value === "view") {
      setSelectedBranch(branch);
      setViewModal(true);
    }
    e.target.value = "";
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

  const actionOptions = [
    { label: "Delete", value: "delete" },
    { label: "View", value: "view" },
  ];

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error: {error?.data?.message || "Failed to load branches"}
        </div>
      </div>
    );
  }
  if (branchLoading || provLoading) {
    return <Loading loading={branchLoading || provLoading} />;
  }
  const branch = branchData?.data || [];
  const provinceOptions = provinceData?.data.map((prov) => ({
    value: prov.province_id,
    label: prov.province_name,
  }));
  const districtOptions =
    districts?.data.map((dist) => ({
      value: dist.district_id,
      label: dist.district_name,
    })) || [];
  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-auto">
      {/* Header */}
      <div className="p-4 md:p-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Branch Management</h1>
        <p className="text-gray-600 mt-2">Manage branches</p>
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
                <Input
                  label="Branch Name"
                  type="text"
                  id="branch_name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter branch name"
                  value={formData.branch_name || ""}
                  onChange={handleChange}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Province
                  </label>
                  <Select
                    id="province_id"
                    value={province_id}
                    options={provinceOptions}
                    onChange={(e) => {
                      setProvinceId(e.target.value);
                    }}
                    className="w-full "
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select district
                  </label>
                  <Select
                    id="district_id"
                    value={formData.district_id}
                    options={districtOptions}
                    onChange={handleChange}
                    disabled={!province_id}
                    className="w-full "
                  />
                </div>
                <Input
                  label="Remarks"
                  type="text"
                  id="remarks"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add description"
                  value={formData.remarks || ""}
                  onChange={handleChange}
                />
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
                          onChange={(e) => {
                            handleActionChange(e, branch);
                          }}
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
      <DetailsModal
        show={viewModal}
        onClose={() => setViewModal(false)}
        title={`Total Details of ${selectedBranch?.branch_name} Branch`}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch ID
              </label>
              <p className="text-gray-900">{selectedBranch?.branch_id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Name
              </label>
              <p className="text-gray-900">{selectedBranch?.branch_name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <p className="text-gray-900">{selectedBranch?.district_name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Province
              </label>
              <p className="text-gray-900">{selectedBranch?.province_name}</p>
            </div>
          </div>
        </div>
      </DetailsModal>
    </div>
  );
};

export default BranchManagement;
