import React from "react";
import {
  Movie,
  MovieDetails,
  MovieListResponse,
} from "../interfaces/MovieInterface";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchPopularAsync } from "../features/PopularMovies/popularThunks";
import { popularData } from "../features/PopularMovies/popularSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccessToken } from "../constant";
import { Modal } from "./Modal/Modal";
import { fetchMovieDetails } from "../api/api";

export const PopularNow = () => {
  const data: MovieListResponse = useAppSelector(popularData);
  const dispatch = useAppDispatch();
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [movieDetails, setMovieDetails] = React.useState<MovieDetails>();
  const [loadingState, setLoadingState] = React.useState<boolean>(false);

  const getMovieDetails = async (movieid: number) => {
    const res = await fetchMovieDetails(AccessToken, movieid);
    console.log(movieid);
    setMovieDetails(res.data);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = async (movieid: number) => {
    setLoadingState(true);
    // await getMovieDetails(movieid);
    document.getElementById("overlay")?.classList.add("overlay");
    document.body.classList.add("overflow-y-hidden");
    setIsModalOpen(true);
    setLoadingState(false);
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
    <div>
      {/* {movieDetails === undefined ? (
        <div className="bg-slate-50 absolute left-1/2 top-1/2 z-[9999]">
          <div className="w-12 h-12 d-flex rounded-full animate-spin
          border-y border-solid border-yellow-500 border-t-transparent shadow-md"></div>
        </div>
      ) : 
      (<Modal
        IsOpen={isModalOpen}
        onClose={handleModalClose}
        movieDetail={movieDetails}
      />)
      } */}
      <section className="overflow-hidden container mx-auto">
        <div className="py-3">
          <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl">
            <span className="bg-gradient-to-r from-neutral-200 via-violet-600 to-violet-600 bg-clip-text text-transparent">
              Popular Now
            </span>
          </h1>
          <Swiper
            spaceBetween={12}
            // breakpoints={{
            //   // when window width is >= 640px
            //   640: {
            //     width: 640,
            //     slidesPerView: 5,
            //   },
            //   // when window width is >= 768px
            //   768: {
            //     width: 768,
            //     slidesPerView: 7,
            //   },

            // }}
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
                  <div
                    className="h-full overflow-visible w-full cursor-pointer"
                    onClick={() => handleModalOpen(value.id)}
                  >
                    <div className="flex">
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
      
      
    </div>
  );
};
