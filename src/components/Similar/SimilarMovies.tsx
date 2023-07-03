import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccessToken } from "../../constant";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Movie, MovieListResponse } from "../../interfaces/MovieInterface";
import { similarData } from "../../features/SimilarMovies/similarSlice";
import { fetchSimilarAsync } from "../../features/SimilarMovies/similarThunks";

interface SimilarMovieProps {
  movieID: number;
}

export const SimilarMovies: React.FC<SimilarMovieProps> = ({ movieID }) => {
  const data: MovieListResponse = useAppSelector(similarData);
  const dispatch = useAppDispatch();
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  React.useEffect(() => {
    dispatch(
      fetchSimilarAsync({
        access_token: AccessToken,
        movieID: movieID,
        page: pageNumber,
      })
    );
  }, [dispatch, pageNumber, movieID]);

  React.useEffect(() => {
    if (Array.isArray(data.results) && data.results.length > 0) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [data.results]);

  const handleSlideChange = (swiper: any) => {
    if (swiper.isEnd && pageNumber !== 3) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <div className="py-3">
        <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl">
          <span className="bg-gradient-to-r from-neutral-200 via-violet-600 to-violet-600 bg-clip-text text-transparent">
            Similar Movies
          </span>
        </h1>
        <Swiper
          spaceBetween={12}
          slidesPerView={7}
          onSlideChange={handleSlideChange}
          observer={true}
          observeSlideChildren={true}
        >
          {!Array.isArray(movies) ? (
            <div>loading...</div>
          ) : (
            movies.slice(20, movies.length).map((value, index) => (
              <SwiperSlide key={index}>
                <div className="h-full overflow-visible w-full cursor-pointer">
                  <div className="h-60 flex">
                    <img
                      className="rounded-3xl w-full"
                      src={
                        "https://image.tmdb.org/t/p/w500" + value.poster_path
                      }
                      alt=""
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};
