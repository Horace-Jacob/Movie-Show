import { MovieListResponse } from "../../interfaces/MovieInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchActionAsync } from "./actionThunks";
import { RootState } from "../../app/store";

interface initialStateInterface {
  data: MovieListResponse;
  status: "idle" | "loading" | "failed";
}

const initialState: initialStateInterface = {
  data: {} as MovieListResponse,
  status: "idle",
};

export const actionSlice = createSlice({
  name: "action",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchActionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchActionAsync.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          state.status = "idle";
          state.data = action.payload;
        }
      )
      .addCase(fetchActionAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const actions = actionSlice.actions;

export const actionData = (state: RootState) => state.action.data;

export const testData = (state: RootState) => state.popular.data;

export default actionSlice.reducer;
