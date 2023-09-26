import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
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
      const { id, first_name, last_name, email, username, password } =
        action.payload;
      return {
        ...state,
        id,
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
        id: "",
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

