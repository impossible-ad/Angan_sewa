export const Loading = ({ isLoading }) => {
  if (!isLoading) return null;
  return <div className="text-3xl text-center font-bold">Loading</div>;
};

export default Loading;
