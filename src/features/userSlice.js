import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  profile_picture: "",
};

export const userSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      const {
        id,
        first_name,
        last_name,
        email,
        username,
        password,
        profile_picture,
      } = action.payload;
      state.id = id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.username = username;
      state.password = password;
      state.profile_picture = profile_picture;
    },
    unsetUserInfo: (state) => {
      state.id = "";
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.username = "";
      state.password = "";
      state.profile_picture = "";
    },
  },
});

export const { setUserInfo, unsetUserInfo } = userSlice.actions;

export default userSlice.reducer;

