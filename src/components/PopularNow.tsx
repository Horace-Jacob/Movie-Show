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
import { Overlay } from "./Overlay/Overlay";
import { AiOutlinePlus } from "react-icons/ai";
import { RiMovieLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PopularNow = () => {
  const popular: MovieListResponse = useAppSelector(popularData);
  const dispatch = useAppDispatch();
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [movieDetails, setMovieDetails] = React.useState<MovieDetails>();
  const [loadingState, setLoadingState] = React.useState<boolean>(false);
  const [hoveredCardIndex, setHoveredCardIndex] = React.useState<number | null>(
    null
  );

  const notify = () => {
    toast(`🥰 movie added to the list`, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

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
    await getMovieDetails(movieid);
    setIsModalOpen(true);
    setLoadingState(false);
  };

  React.useEffect(() => {
    dispatch(
      fetchPopularAsync({ access_token: AccessToken, page: pageNumber })
    );
  }, [dispatch, pageNumber]);

  React.useEffect(() => {
    if (Array.isArray(popular.results) && popular.results.length > 0) {
      setMovies((prevMovies) => [...prevMovies, ...popular.results]);
    }
  }, [popular]);

  const handleSlideChange = (swiper: any) => {
    if (swiper.isEnd && pageNumber !== 3) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="overflow-hidden container mx-auto">
        <div className="py-3">
          <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl">
            <span className="bg-gradient-to-r from-neutral-200 via-violet-600 to-violet-600 bg-clip-text text-transparent">
              Popular Now
            </span>
          </h1>
          {popular.results === undefined ? (
            <div className="lds-ellipsis relative">
              <div className="bg-gradient-to-r from-purple-700 via-blue-400 to-violet-700"></div>
              <div className="bg-gradient-to-r from-purple-700 via-blue-400 to-violet-700"></div>
              <div className="bg-gradient-to-r from-purple-700 via-blue-400 to-violet-700"></div>
              <div className="bg-gradient-to-r from-purple-700 via-blue-400 to-violet-700"></div>
            </div>
          ) : (
            <Swiper
              spaceBetween={12}
              slidesPerView={7}
              onSlideChange={handleSlideChange}
              observer={true}
              observeSlideChildren={true}
            >
              {movies.map((value, index) => {
                const isCardHovered = hoveredCardIndex === index;
                return (
                  <SwiperSlide key={index}>
                    <div
                      className="h-full overflow-visible w-full cursor-pointer relative"
                      onMouseEnter={() => setHoveredCardIndex(index)}
                      onMouseLeave={() => setHoveredCardIndex(null)}
                    >
                      <div className="flex">
                        <img
                          className="rounded-3xl w-full"
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            value.poster_path
                          }
                          alt=""
                        />
                        {isCardHovered && (
                          <div className="absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-80 transition ease-in-out delay-150 duration-300">
                            <div className="text-slate-200 m-2">
                              {value.title}
                            </div>
                            <div
                              className="flex absolute justify-center
                            items-center hover:bg-opacity-25 bottom-16 rounded-lg bg-white
                            bg-opacity-5 hover:rounded-lg z-50"
                              onClick={() => handleModalOpen(value.id)}
                            >
                              <span className="ml-2">
                                <RiMovieLine color="white" />
                              </span>
                              <span className="text-white m-2">
                                View Details
                              </span>
                            </div>
                            <div
                              onClick={notify}
                              className="flex absolute justify-center items-center hover:bg-opacity-25 bottom-4 rounded-lg bg-white bg-opacity-5 hover:rounded-lg"
                            >
                              <span className="ml-2">
                                <AiOutlinePlus color="white" />
                              </span>
                              <span className="text-white m-2">
                                Add to favourite
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
        {loadingState ? (
          <Overlay
            IsOpen={loadingState}
            LoadingColor="bg-gradient-to-r from-purple-700 via-pink-400 to-indigo-700"
          />
        ) : (
          <Modal
            IsOpen={isModalOpen}
            onClose={handleModalClose}
            movieDetail={movieDetails}
          />
        )}
      </section>
    </div>
  );
};
