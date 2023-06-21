import { MovieListResponse } from "../../interfaces/MovieInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPosterAsync } from "./posterThunks";
import { RootState } from "../../app/store";

interface initialStateInterface {
  data: MovieListResponse;
  status: "idle" | "loading" | "failed";
}

const initialState: initialStateInterface = {
  data: {} as MovieListResponse,
  status: "idle",
};

export const posterSlice = createSlice({
  name: "poster",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPosterAsync.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          state.status = "idle";
          state.data = action.payload;
        }
      )
      .addCase(fetchPosterAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const actions = posterSlice.actions;

export const posterData = (state: RootState) => state.poster.data;

export default posterSlice.reducer;
