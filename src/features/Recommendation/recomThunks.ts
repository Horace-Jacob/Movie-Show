import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecommendationMovies } from "../../api/api";

export const fetchRecommendationAsync = createAsyncThunk(
  "recom/fetchrecom",
  async ({
    access_token,
    movieID,
    page,
  }: {
    access_token: string;
    movieID: number;
    page: number;
  }) => {
    const res = await fetchRecommendationMovies(access_token, movieID, page);
    return res.data;
  }
);