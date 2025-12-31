import { useGetAllDistrictsQuery } from "../../redux/features/districtSlice";

const Districts = () => {
  const{data,isLoading,isError,error  } = useGetAllDistrictsQuery();

  return <div>Districts</div>;
};

export default Districts;
