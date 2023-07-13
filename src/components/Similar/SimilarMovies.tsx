import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AccessToken } from "../../constant";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  Movie,
  MovieDetails,
  MovieListResponse,
} from "../../interfaces/MovieInterface";
import { similarData } from "../../features/SimilarMovies/similarSlice";
import { fetchSimilarAsync } from "../../features/SimilarMovies/similarThunks";
import { Modal } from "../Modal/Modal";
import { fetchMovieDetails } from "../../api/api";
import { AiOutlinePlus } from "react-icons/ai";
import { RiMovieLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

interface SimilarMovieProps {
  movieID: number;
}

export const SimilarMovies: React.FC<SimilarMovieProps> = ({ movieID }) => {
  const data: MovieListResponse = useAppSelector(similarData);
  const dispatch = useAppDispatch();
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true);
  const [movieDetails, setMovieDetails] = React.useState<MovieDetails>();
  const [hoveredCardIndex, setHoveredCardIndex] = React.useState<number | null>(
    null
  );

  const getMovieDetails = async (movieid: number) => {
    const res = await fetchMovieDetails(AccessToken, movieid);
    setMovieDetails(res.data);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  
  const handleModalOpen = async (movieid: number) => {
    await getMovieDetails(movieid);
    setIsModalOpen(true);
  };

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
  

  React.useEffect(() => {
    dispatch(
      fetchSimilarAsync({
        access_token: AccessToken,
        movieID: movieID,
        page: pageNumber,
      })
    );
  }, [movieID, dispatch, pageNumber]);

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
      <ToastContainer/>
      <div className="py-3">
        <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl">
          <span className="bg-gradient-to-r from-neutral-200 via-violet-600 to-violet-600 bg-clip-text text-transparent">
            Similar Movies
          </span>
        </h1>
        {data.results?.length === 0 ? (
          <div className="text-slate-500">
          Check back later for similar movies
        </div>
        ) : (
          <Swiper
              spaceBetween={12}
              slidesPerView={7}
              onSlideChange={handleSlideChange}
              observer={true}
              observeSlideChildren={true}
              breakpoints={{
                // when window width is >= 640px
                380:{
                  slidesPerView: 3,
                },
                640: {
                  slidesPerView: 3,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 5,
                },
                1024: {
                  slidesPerView: 7
                }
              }}
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
                            <div className="text-slate-200 m-2 max-sm:text-xs max-md:text-xs">
                              {value.title}
                            </div>
                            <div
                              className="flex absolute justify-center
                            items-center hover:bg-opacity-25 bottom-14 rounded-lg hover:bg-white
                            bg-opacity-5 hover:rounded-lg z-50"
                              onClick={() => handleModalOpen(value.id)}
                            >
                              <span className="ml-2">
                                <RiMovieLine color="white" />
                              </span>
                              <span className="text-white m-2 max-sm:text-xs max-md:text-xs">
                                Details
                              </span>
                            </div>
                            <div
                              onClick={notify}
                              className="flex absolute justify-center items-center hover:bg-opacity-25 bottom-4 rounded-lg hover:bg-white bg-opacity-5 hover:rounded-lg"
                            >
                              <span className="ml-2">
                                <AiOutlinePlus color="white" />
                              </span>
                              <span className="text-white m-2 max-sm:text-xs max-md:text-xs">
                                Watchlist
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

        {movieDetails !== undefined && (
          <Modal
            IsOpen={isModalOpen}
            movieDetail={movieDetails}
            isNested={true}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};
