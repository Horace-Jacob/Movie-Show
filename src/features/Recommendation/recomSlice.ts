import { MovieListResponse } from "../../interfaces/MovieInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchRecommendationAsync } from "./recomThunks";
import { RootState } from "../../app/store";

interface initialStateInterface {
  data: MovieListResponse;
  status: "idle" | "loading" | "failed";
}

const initialState: initialStateInterface = {
  data: {} as MovieListResponse,
  status: "idle",
};

export const recomSlice = createSlice({
  name: "recom",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRecommendationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRecommendationAsync.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          state.status = "idle";
          state.data = action.payload;
        }
      )
      .addCase(fetchRecommendationAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const actions = recomSlice.actions;

export const recomData = (state: RootState) => state.recom.data;

export default recomSlice.reducer;
