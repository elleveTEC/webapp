import { createSlice } from "@reduxjs/toolkit";

export const pageIndicatorSlice = createSlice({
  name: "pageIndicator",
  initialState: {
    page: "calculate",
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPage } = pageIndicatorSlice.actions;

export default pageIndicatorSlice.reducer;
