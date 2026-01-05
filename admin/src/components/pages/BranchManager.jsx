import { useState } from "react";
import {
  useAddBManagerMutation,
  useDeletebManagerMutation,
  useEditbManagerMutation,
  useGetAllPDBQuery,
  useGetBManagerQuery,
} from "../../redux/features/authSlice";
import Loading from "../shared/IsLoading";
import { toast } from "react-toastify";
import { useGetAllBranchsQuery } from "../../redux/features/branchSlice";
import Select from "../shared/Select";
import DetailsModal from "../shared/Modal";
import Input from "../shared/Input";

const BranchManager = () => {
  const {
    data: branchManager,
    isLoading: bManagerLoading,
    isError,
    error,
  } = useGetBManagerQuery();
  const { data: branch, isLoading: branchLoading } = useGetAllBranchsQuery();
  const [addBManager] = useAddBManagerMutation();
  const [deleteBManager] = useDeletebManagerMutation();
  const [editBManager] = useEditbManagerMutation();
  const [province_id, setProvinceId] = useState("");
  const [district_id, setDistrictId] = useState("");
  const { data: pdb, isLoading: pdbLoading } = useGetAllPDBQuery({
    province_id,
    district_id,
  });
  const [editData, setEditData] = useState({
    email: "",
    password: "",
  });
  const [editModal, setEditModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch_id: "",
  });
  const handleChange = async (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleActionChange = (e, manager) => {
    if (e.target.value === "edit") {
      setEditModal(true);
      setEditData({
        email: manager.email,
      });
    } else if (e.target.value === "delete") {
      handleDelete(manager.id);
    }
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.branch_id
      ) {
        return toast.error("please fill all the fields");
      }
      const res = await addBManager(formData).unwrap();
      toast.success(res.message || "branch manager added successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        branch_id: "",
      });
    } catch (error) {
      toast.error(error.data?.message || "failed to add branch manager");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (
        !window.confirm("Are you sure you want to delete this branch manager?")
      )
        return;
      const res = await deleteBManager(id).unwrap();
      toast.success(res.message || "branch manager deleted successfully");
    } catch (error) {
      toast.error(error.data?.message || "failed to delete branch manager");
    }
  };

  const handleEdit = async (id) => {
    setEditModal(true);
    try {
      await editBManager(editData).unwrap();
      toast.success("branch manager edited successfully");
    } catch (error) {
      toast.error("failed to edit branch manager");
    }
  };
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error: {error?.data?.message || "Failed to load branch Managers"}
        </div>
      </div>
    );
  }
  if (bManagerLoading || branchLoading || pdbLoading) {
    return <Loading loading={bManagerLoading || branchLoading || pdbLoading} />;
  }
  const actionOptions = [
    { label: "Delete", value: "delete" },
    { label: "Edit", value: "edit" },
  ];
  const branches = branch?.data || [];
  const bManager = branchManager?.data || [];
  const pdbData = pdb?.data || [];

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-auto">
      {/* Header */}
      <div className="p-4 md:p-8 pb-4  ">
        <h1 className="text-3xl font-bold text-gray-800">Branch Manager</h1>
        <p className="text-gray-600 mt-2">Manage your branch managers</p>
      </div>

      {/* Add Branch Manager Form */}
      <div className="px-4 md:px-8 pb-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Add Branch Manager
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Province
                  </label>
                  <select
                    id="province_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    value={province_id}
                    onChange={(e) => setProvinceId(e.target.value)}
                  >
                    <option value="">-- Choose Province --</option>
                    {(pdbData?.provinces || []).map((province) => (
                      <option
                        key={province.province_id}
                        value={province.province_id}
                      >
                        {province.province_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select District
                  </label>
                  <select
                    id="district_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    value={district_id}
                    onChange={(e) => setDistrictId(e.target.value)}
                  >
                    <option value="">-- Choose District --</option>
                    {branches.map((branch) => (
                      <option key={branch.branch_id} value={branch.branch_id}>
                        {branch.branch_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Branch
                  </label>
                  <select
                    id="branch_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    value={formData.branch_id}
                    onChange={handleChange}
                  >
                    <option value="">-- Choose Branch --</option>
                    {branches.map((branch) => (
                      <option key={branch.branch_id} value={branch.branch_id}>
                        {branch.branch_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch Manager Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Branch Manager's name"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Branch Manager's email"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Branch Manager's password"
                    value={formData.password || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                Add Branch Manager
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="px-4 md:px-8 pb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Branch Manager List
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    User Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Branch Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bManager.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No branch manager found
                    </td>
                  </tr>
                ) : (
                  bManager.map((manager) => (
                    <tr key={manager.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {manager.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {manager.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {manager.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {manager.branch_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Select
                          options={actionOptions}
                          onChange={(e) => {
                            handleActionChange(e, manager);
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
              Total branch managers:{" "}
              <span className="font-semibold">{bManager.length}</span>
            </p>
          </div>
        </div>
      </div>
      <DetailsModal
        show={editModal}
        onClose={() => setEditModal(false)}
        title="Edit Branch Manager"
        size="lg"
      >
        <form onSubmit={handleEdit} className="flex flex-col w-full gap-5">
          <Input
            label="Email"
            type="text"
            placeholder="Enter the email"
            id="email"
            value={editData.email}
            autoComplete="off"
            required
            onChange={handleChange}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter the password"
            id="password"
            value={editData.password}
            autoComplete="off"
            required
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-3"
          >
            Edit
          </button>
        </form>
      </DetailsModal>
    </div>
  );
};

export default BranchManager;
