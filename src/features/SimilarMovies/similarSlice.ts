import { MovieListResponse } from "../../interfaces/MovieInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchSimilarAsync } from "./similarThunks";
import { RootState } from "../../app/store";

interface initialStateInterface {
  data: MovieListResponse;
  status: "idle" | "loading" | "failed";
}

const initialState: initialStateInterface = {
  data: {} as MovieListResponse,
  status: "idle",
};

export const similarSlice = createSlice({
  name: "similar",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchSimilarAsync.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          state.status = "idle";
          state.data = action.payload;
        }
      )
      .addCase(fetchSimilarAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const actions = similarSlice.actions;

export const similarData = (state: RootState) => state.similar.data;

export default similarSlice.reducer;
