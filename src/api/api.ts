import axios from "axios";

export const fetchPosterMovie = async (access_token: string) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    }
  );
  return res;
};

export const fetchMovieDetails = async (
  access_token: string,
  movieID: number | undefined
) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    }
  );
  return res;
};

export const fetchSimilarMovies = async (
  access_token: string,
  movieID: number,
  pageNumber: number
) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    }
  );
  return res;
};

export const fetchPopularMovies = async (
  access_token: string,
  page: number
) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    }
  );
  return res;
};

export const fetchActionMovies = async (access_token: string, page: number) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=28%2C%2012%2C%2053`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    }
  );
  return res;
};

export const fetchRomanceMovies = async (
  access_token: string,
  page: number
) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=10749%2C18%2C35%2C10751`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: "application/json",
      },
    }
  );
  return res;
};
