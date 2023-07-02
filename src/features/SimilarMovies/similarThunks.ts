import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSimilarMovies } from "../../api/api";

export const fetchSimilarAsync = createAsyncThunk(
  "similar/fetchsimilar",
  async ({
    access_token,
    movieID,
    page,
  }: {
    access_token: string;
    movieID: number;
    page: number;
  }) => {
    const res = await fetchSimilarMovies(access_token, movieID, page);
    return res.data;
  }
);
