import React from "react";
import { Movie, MovieListResponse } from "../interfaces/MovieInterface";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchActionAsync } from "../features/ActionAdventure/actionThunks";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccessToken } from "../constant";
import { actionData } from "../features/ActionAdventure/actionSlice";

export const ActionAdventure = () => {
  const data: MovieListResponse = useAppSelector(actionData);
  const dispatch = useAppDispatch();
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);

  React.useEffect(() => {
    dispatch(fetchActionAsync({ access_token: AccessToken, page: pageNumber }));
  }, [dispatch, pageNumber]);

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
    <section className="overflow-hidden container mx-auto">
      <div className="py-3">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl">
          <span className="bg-gradient-to-r from-gray-400 via-red-500 to-red-700 bg-clip-text text-transparent">
            Action Adventure
          </span>
        </h1>
        <Swiper
          spaceBetween={10}
          slidesPerView={9}
          onSlideChange={handleSlideChange}
          observer={true}
          observeSlideChildren={true}
        >
          {!Array.isArray(movies) ? (
            <div>loading...</div>
          ) : (
            movies.slice(20, movies.length).map((value, index) => (
              <SwiperSlide key={index}>
                <div className="h-full overflow-visible w-full">
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
    </section>
  );
};
