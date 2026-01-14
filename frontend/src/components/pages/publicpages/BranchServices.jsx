import { useGetServicesQuery } from "../../../redux/slice/publicSlice";
import { useLocation, useParams } from "react-router-dom";
const BranchServices = () => {
  const { state } = useLocation();
  const branchId = state?.branchId;

  // Pass branchId to the hook
  // Added skip: !branchId to prevent the 'undefined' call
  const {
    data: servicesdata,
    isLoading,
    isError,
    error,
  } = useGetServicesQuery(branchId, { skip: !branchId });

  const services = servicesdata?.data;

  if (isLoading) return <div>Loading services...</div>;
  if (isError)
    return <div>Error: {error?.message || "Something went wrong"}</div>;

  return (
    <div>
      <h2>Services for this Branch</h2>
      <div className="services-list">
        {services?.map((service) => (
          <div key={service.service_id}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BranchServices;
