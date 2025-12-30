import { useGetAllProvincesQuery } from "../../redux/features/provinceSlice";

const Provinces = () => {
  const { data, isLoading, isError, error } = useGetAllProvincesQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading provinces...</div>
      </div>
    );
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
    <div className="h-screen w-full bg-gray-100 flex flex-col">
      <div className="flex-1 p-4 md:p-8 w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Province Management
          </h1>
          <p className="text-gray-600 mt-2">Add and view provinces</p>
        </div>

        {/* Main Content Area - Grid grows to fill space */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
          {/* Add Province Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Add Province
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Province Name
                  </label>
                  <input
                    type="text"
                    name="province_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter province name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District ID
                  </label>
                  <input
                    type="number"
                    name="district_id"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter district ID"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  Add Province
                </button>
              </form>
            </div>
          </div>

          {/* Province Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  Provinces List
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Province ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Province Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        District ID
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {provinces.length === 0 ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="px-6 py-8 text-center text-gray-500"
                        >
                          No provinces found
                        </td>
                      </tr>
                    ) : (
                      provinces.map((province) => (
                        <tr
                          key={province.province_id}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {province.province_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {province.province_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {province.district_id}
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
      </div>
    </div>
  );
};

export default Provinces;
