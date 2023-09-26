import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
};

export const userSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const { first_name, last_name, email, username, password } =
        action.payload;
      return {
        ...state,
        first_name,
        last_name,
        email,
        username,
        password,
      };
    },
    unsetUserInfo: (state) => {
      return {
        ...state,
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
      };
    },
  },
});

export const { setUserInfo, unsetUserInfo } = userSlice.actions;

export default userSlice.reducer;

