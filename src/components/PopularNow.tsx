import React from "react";
import { Movie, MovieListResponse } from "../interfaces/MovieInterface";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPopularAsync } from "../features/PopularMovies/popularThunks";
import { popularData } from "../features/PopularMovies/popularSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccessToken } from "../constant";
import { Modal } from "./Modal/Modal";

export const PopularNow = () => {
  const data: MovieListResponse = useAppSelector(popularData);
  const dispatch = useAppDispatch();
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const handleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  React.useEffect(() => {
    dispatch(
      fetchPopularAsync({ access_token: AccessToken, page: pageNumber })
    );
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
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Popular Now
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
                <div
                  className="h-full overflow-visible w-full cursor-pointer"
                  onClick={handleModal}
                >
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
        <Modal IsOpen={isModalOpen} />
      </div>
    </section>
  );
};
