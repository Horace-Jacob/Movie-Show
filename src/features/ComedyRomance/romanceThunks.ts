import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRomanceMovies } from "../../api/api";

export const fetchRomanceAsync = createAsyncThunk(
  "romance/fetchromance",
  async ({ access_token, page }: { access_token: string; page: number }) => {
    const res = await fetchRomanceMovies(access_token, page);
    return res.data;
  }
);
