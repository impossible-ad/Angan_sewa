import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useVerifyTokenQuery } from "../redux/features/authSlice";
import { clearUser } from "../redux/features/authState";
import { useEffect } from "react";

export const Guard = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useVerifyTokenQuery();
  const expDate = new Date(data?.user.exp * 1000);
  const initializedDate = new Date(data?.user.iat * 1000);
  console.log(expDate);
  console.log(initializedDate);
  useEffect(() => {
    if (data?.user?.exp) {
      if (Date.now() > expDate) {
        dispatch(clearUser());
      }
    }
    if (error && isAuth) {
      dispatch(clearUser());
    }
  });

  return isAuth ? children : <Navigate to="/" />;
};
