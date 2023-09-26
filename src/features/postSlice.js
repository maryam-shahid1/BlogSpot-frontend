import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  content: "",
  category: "",
  status: "",
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
});

export default postSlice.reducer;

