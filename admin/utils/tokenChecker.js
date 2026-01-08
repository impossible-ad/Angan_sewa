import { authAPIs } from "../src/redux/features/authSlice";
import store from "../src/redux/store";

export const checkTokenExpiry = async () => {
  try {
    const result = await store
      .dispatch(authAPIs.endpoints.verifyToken.initiate())
      .unwrap();
    console.log("token is valid:", result);
    return result;
  } catch (error) {
    return false;
  }
};
