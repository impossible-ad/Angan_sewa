import React from "react";
import { useGetBManagerQuery } from "../../redux/features/authSlice";
import Loading from "../shared/IsLoading";

const BranchManager = () => {
  const { data, isLoading, isError, error } = useGetBManagerQuery();
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">
          Error: {error?.data?.message || "Failed to load branches"}
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <Loading loading={isLoading} />;
  }
  const bManager = data?.data || [];
  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-auto">
      {/* Header */}
      <div className="p-4 md:p-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Branch Manager</h1>
        <p className="text-gray-600 mt-2">Manage branch manager</p>
      </div>
      <div className="px-4 md:px-8 pb-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Branch Manager
          </h2>
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
                        {/* <Select
                          options={actionOptions}
                          actions={action}
                          itemId={manager.id}
                        /> */}
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
              <span className="font-semibold">{bManager.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchManager;
