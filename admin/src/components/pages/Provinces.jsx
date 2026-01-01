import { toast } from "react-toastify";
import {
  useAddProvinceMutation,
  useDeleteProvinceMutation,
  useGetAllProvincesQuery,
} from "../../redux/features/provinceSlice";
import { useState } from "react";
import Loading from "../shared/IsLoading";
import Select from "../shared/Select";

const Provinces = () => {
  const { data, isLoading, isError, error } = useGetAllProvincesQuery();
  const [addProvince] = useAddProvinceMutation();
  const [deleteProvince] = useDeleteProvinceMutation();
  const [formData, setFormData] = useState({
    province_name: "",
  });

  const actionOptions = [
    { value: "view", label: "View" },
    { value: "delete", label: "Delete" },
  ];

  const handleDelete = async (province_id) => {
    if (!window.confirm("Are you sure you want to delete this province?"))
      return;
    try {
      await deleteProvince(province_id).unwrap();
      toast.success("Province deleted successfully");
    } catch (error) {
      toast.error(error.data?.message || "failed to delete province");
    }
  };
  const actions = {
    delete: handleDelete,
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Payload check:", formData);
    if (!formData.province_name) {
      toast.error("Please enter a province name");
      return;
    }
    try {
      const res = await addProvince(formData).unwrap();
      toast.success(res.message || "province added successfully");
      setFormData({ province_name: "" });
    } catch (error) {
      toast.error(error.data?.message || "failed to add province");
      console.log(error.data?.message);
    }
    return;
  };
  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error: {error?.data?.message || "Failed to load provinces"}
        </div>
      </div>
    );
  }

  const provinces = data?.data || [];

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-auto">
      {/* Header */}
      <div className="p-4 md:p-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Province Management
        </h1>
        <p className="text-gray-600 mt-2">Add and view provinces</p>
      </div>

      {/* Add Province Form*/}
      <div className="px-4 md:px-8 pb-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Add Province
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province Name
                  </label>
                  <input
                    type="text"
                    name="province_name"
                    id="province_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter province name"
                    value={formData.province_name || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                Add Province
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Province Table - Full Width */}
      <div className="px-4 md:px-8 pb-8 flex-1 min-h-0">
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Provinces List
            </h2>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Province ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Province Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {provinces.length === 0 ? (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No provinces found
                    </td>
                  </tr>
                ) : (
                  provinces.map((province) => (
                    <tr key={province.province_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {province.province_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {province.province_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Select
                          options={actionOptions}
                          actions={actions}
                          itemId={province.province_id}
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
              Total Provinces:{" "}
              <span className="font-semibold">{provinces.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Provinces;
