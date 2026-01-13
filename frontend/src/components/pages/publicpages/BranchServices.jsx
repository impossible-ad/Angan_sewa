import React from "react";
import { useGetServicesQuery } from "../../../redux/slice/publicSlice";
const BranchServices = () => {
  const {
    data: servicesdata,
    isLoading,
    isError,
    error,
  } = useGetServicesQuery();
  const { place } = useParams();
  const services = servicesdata?.data;
  return (
    <div>
      <div>BranchServices</div>

      <div></div>
    </div>
  );
};

export default BranchServices;
