import { useSelector } from "react-redux";

const Profile = () => {
  const { email, role } = useSelector((state) => state.user);

  return (
    <div className ="flex flex-justify-between">
      <h1 className="">{role}</h1>
      <h2>{email}</h2>
    </div>
  );
};

export default Profile;
