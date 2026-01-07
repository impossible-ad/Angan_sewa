import { toast } from "react-toastify";
import {
  useAddDistrictMutation,
  useDeleteDistrictMutation,
  useGetAllDistrictsQuery,
} from "../../redux/features/districtSlice";
import Loading from "../shared/IsLoading";
import Select from "../shared/Select";
import { useState } from "react";
import { useGetAllProvincesQuery } from "../../redux/features/provinceSlice";

const Districts = () => {
  const [formData, setFormData] = useState({
    district_name: "",
    province_id: "",
  });
  const {
    data: districtData,
    isLoading: disLoading,
    isError,
    error,
  } = useGetAllDistrictsQuery();
  const [addDistrict] = useAddDistrictMutation();
  const [deleteDistrict] = useDeleteDistrictMutation();
  const { data: provinceData, isLoading: provLoading } =
    useGetAllProvincesQuery();
  const actionOptions = [
    {
      value: "view",
      label: "View",
    },
    {
      value: "delete",
      label: "Delete",
    },
  ];
  const handleActionChange = (e, district_id) => {
    if (e.target.value === "delete") {
      handleDelete(district_id);
    }
    e.target.value = "";
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.district_name || !formData.province_id) {
        return toast.error("Please fill all the fields");
      }
      const res = await addDistrict(formData).unwrap();
      toast.success(res.message || "District added successfully");
      setFormData({ district_name: "", province_id: "" });
    } catch (error) {
      toast.error(error.data?.message || "failed to add district");
    }
  };
  const handleDelete = async (district_id) => {
    if (!window.confirm("Are you sure you want to delete this district?"))
      return;
    try {
      await deleteDistrict(district_id).unwrap();
      toast.success("District deleted successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete district");
    }
  };

  if (disLoading || provLoading) {
    return <Loading loading={disLoading || provLoading} />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error: {error?.data?.message || "Failed to load districts"}
        </div>
      </div>
    );
  }

  const district = districtData?.data || [];
  const provinceOptions =
    provinceData?.data.map((prov) => ({
      value: prov.province_id,
      label: prov.province_name,
    })) || [];

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-auto">
      {/* Header */}
      <div className="p-4 md:p-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          District Management
        </h1>
        <p className="text-gray-600 mt-2">Add and view districts</p>
      </div>
      {/* Add District Form */}
      <div className="px-4 md:px-8 pb-4">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Add District
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District Name
                  </label>
                  <input
                    type="text"
                    name="district_name"
                    id="district_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter district name"
                    value={formData.district_name || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Province Dropdown  */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Province
                  </label>
                  <Select
                    id="province_id"
                    value={formData.province_id}
                    options={provinceOptions}
                    onChange={handleChange}
                    className="w-full "
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                Add District
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* District Table - Full Width */}
      <div className="px-4 md:px-8 pb-8 flex-1 min-h-0">
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              District List
            </h2>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    District ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    District Name
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
                {district.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No District found
                    </td>
                  </tr>
                ) : (
                  district.map((district) => (
                    <tr key={district.district_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {district.district_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {district.district_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {district.province_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Select
                          options={actionOptions}
                          onChange={(e) => {
                            handleActionChange(e, district.district_id);
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
              Total districts:{" "}
              <span className="font-semibold">{district.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Districts;

//                    id="province_id"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
//                   value={formData.province_id}
//                   onChange={handleChange}
//                 >
//                   <option value="">-- Choose Province --</option>
//                   {province.map((prov) => (
//                     <option key={prov.province_id} value={prov.province_id}>
//                       {prov.province_name}
//                     </option>
//                   ))}
