import { MovieListResponse } from "../../interfaces/MovieInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchRomanceAsync } from "./romanceThunks";
import { RootState } from "../../app/store";

interface initialStateInterface {
  data: MovieListResponse;
  status: "idle" | "loading" | "failed";
}

const initialState: initialStateInterface = {
  data: {} as MovieListResponse,
  status: "idle",
};

export const romanceSlice = createSlice({
  name: "romance",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRomanceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRomanceAsync.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          state.status = "idle";
          state.data = action.payload;
        }
      )
      .addCase(fetchRomanceAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const actions = romanceSlice.actions;

export const romanceData = (state: RootState) => state.romance.data;

export default romanceSlice.reducer;
