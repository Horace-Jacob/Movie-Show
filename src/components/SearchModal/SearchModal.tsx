import React from "react";
import { Movie, MovieDetails } from "../../interfaces/MovieInterface";
import { RiMovieLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "../Modal/Modal";
import { fetchMovieDetails } from "../../api/api";
import { AccessToken } from "../../constant";

interface ModalProps {
  IsOpen?: boolean;
  onClose?: () => void;
  movies: Movie[] | undefined;
  isNested?: boolean;
  searchQuery: string;
}

export const SearchModal: React.FC<ModalProps> = ({
  IsOpen,
  onClose,
  movies,
  isNested = false,
  searchQuery,
}) => {
  const [hoveredCardIndex, setHoveredCardIndex] = React.useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(true);
  const [movieDetails, setMovieDetails] = React.useState<MovieDetails>();
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
  React.useEffect(() => {
    if (IsOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [IsOpen]);

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

  return (
    <>
    <ToastContainer />
      <div
        data-te-modal-init
        className={`fixed left-0 top-0 z-[1055] ${IsOpen ? "" : "hidden"} ${
          IsOpen ? "modal-open" : ""
        } h-full w-full overflow-y-auto overflow-x-hidden outline-none`}
        id="exampleModalFullscreen"
        tabIndex={-1}
        aria-labelledby="exampleModalFullscreenLabel"
        aria-hidden="true"
      >
        <div
          data-te-modal-dialog-ref
          className={`md:container md:mx-auto pointer-events-none relative w-auto  ${
            IsOpen ? "opacity-1" : "opacity-0"
          } transition-all duration-300 ease-in-out min-[0px]:m-0 min-[0px]:h-full min-[0px]:max-w-none`}
        >
          <div className="pointer-events-auto relative flex w-full flex-col rounded-md bg-black bg-clip-padding text-current shadow-lg outline-none  min-[0px]:h-full min-[0px]:rounded-none min-[0px]:border-0">
            <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50 min-[0px]:rounded-none">
              <h5
                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalFullscreenLabel"
              >
                {searchQuery}
              </h5>
              {isNested ? (
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  aria-label="Close"
                >
                  <a href="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </a>
                </button>
              ) : (
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  aria-label="Close"
                  onClick={onClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {movies !== undefined ? (
              <div className="relative p-4 min-[0px]:overflow-y-auto text-white">
                <div className="row-auto">
                  <div className="columns-7 max-md:columns-5 max-sm:columns-3">
                    {movies.map((value, index) => {
                      const isCardHovered = hoveredCardIndex === index;
                      if(value.backdrop_path === null){
                        return false;
                      }
                      return (
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
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              false
            )}
          </div>
        </div>
        {movieDetails !== undefined && (
          <Modal
            IsOpen={isModalOpen}
            movieDetail={movieDetails}
            
            onClose={handleModalClose}
          />
        )}
      </div>
    </>
  );
};
