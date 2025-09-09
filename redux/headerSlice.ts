import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = ["home"];

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHeader: (state, action: PayloadAction<string[]>) => {
      return action.payload; // replace entire array
    },
  },
});

export const { setHeader } = headerSlice.actions;
export default headerSlice.reducer;
