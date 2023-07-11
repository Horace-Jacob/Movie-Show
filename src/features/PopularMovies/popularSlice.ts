import { MovieListResponse } from "../../interfaces/MovieInterface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchPopularAsync } from "./popularThunks";
import { RootState } from "../../app/store";

interface initialStateInterface {
  data: MovieListResponse;
  status: "idle" | "loading" | "failed";
}

const initialState: initialStateInterface = {
  data: {} as MovieListResponse,
  status: "idle",
};

export const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<MovieListResponse>) => {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPopularAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPopularAsync.fulfilled,
        (state, action: PayloadAction<MovieListResponse>) => {
          state.status = "idle";
          state.data = action.payload;
        }
      )
      .addCase(fetchPopularAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updateData } = popularSlice.actions;

export const popularData = (state: RootState) => state.popular.data;

export default popularSlice.reducer;
