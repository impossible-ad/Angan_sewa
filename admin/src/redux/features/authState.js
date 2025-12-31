import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  role: "",
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isAuth = !!action.payload;
    },

    clearUser: (state) => {
      state.email = "";
      state.role = "";
      state.isAuth = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
