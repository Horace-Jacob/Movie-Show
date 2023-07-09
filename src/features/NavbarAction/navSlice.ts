import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface NavState {
  current: string;
}

const initialState = {
  current: "movies",
} as NavState;

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    changeByAction: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    },
  },
});

export const { changeByAction } = navSlice.actions;

export const currentSelection = (state: RootState) => state.nav.current;

export default navSlice.reducer;
