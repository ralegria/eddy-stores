import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
  name: "layoutSlice",
  initialState: {
    isCartOpen: false,
  },
  reducers: {
    switchCartStatus: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchCartStatus } = layoutSlice.actions;

export default layoutSlice.reducer;
