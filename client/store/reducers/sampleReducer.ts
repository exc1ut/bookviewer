import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
  name: "sample",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export default exampleSlice.reducer;

export const { increment, decrement } = exampleSlice.actions;
