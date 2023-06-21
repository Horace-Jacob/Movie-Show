import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPosterMovie } from "../../api/api";

export const fetchPosterAsync = createAsyncThunk(
  "poster/fetchposter",
  async (access_token: string) => {
    const res = await fetchPosterMovie(access_token);
    return res.data;
  }
);
