import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "../../api/api";

export const fetchPopularAsync = createAsyncThunk(
  "popular/fetchpopular",
  async ({ access_token, page }: { access_token: string; page: number }) => {
    const res = await fetchPopularMovies(access_token, page);
    return res.data;
  }
);
