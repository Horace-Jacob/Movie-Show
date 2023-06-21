import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchActionMovies } from "../../api/api";

export const fetchActionAsync = createAsyncThunk(
  "action/fetchaction",
  async ({ access_token, page }: { access_token: string; page: number }) => {
    const res = await fetchActionMovies(access_token, page);
    return res.data;
  }
);
