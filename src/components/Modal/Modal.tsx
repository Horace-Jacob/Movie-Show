import React from "react";
import { MovieDetails } from "../../interfaces/MovieInterface";
import { SimilarMovies } from "../Similar/SimilarMovies";

interface ModalProps {
  IsOpen: boolean;
  onClose: () => void;
  movieDetail: MovieDetails | undefined;
}

export const Modal: React.FC<ModalProps> = ({
  IsOpen,
  onClose,
  movieDetail,
}) => {

  React.useEffect(() => {
    if(IsOpen){
      document.body.classList.add("overflow-y-hidden");
    }else{
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [IsOpen]);
  
  return (
    <>
      {movieDetail !== undefined ? (
        <div
          data-te-modal-init
          className={`fixed left-0 top-0 z-[1055] ${
            IsOpen ? "" : "hidden"
          } ${IsOpen ? "modal-open" : ""} h-full w-full overflow-y-auto overflow-x-hidden outline-none`}
          id="exampleModalFullscreen"
          tabIndex={-1}
          aria-labelledby="exampleModalFullscreenLabel"
          aria-hidden="true"
        >
          <div
            data-te-modal-dialog-ref
            className={`pointer-events-none relative w-auto  ${
              IsOpen ? "opacity-1" : "opacity-0"
            } transition-all duration-300 ease-in-out min-[0px]:m-0 min-[0px]:h-full min-[0px]:max-w-none`}
          >
            <div className="pointer-events-auto relative flex w-full flex-col rounded-md bg-black bg-clip-padding text-current shadow-lg outline-none  min-[0px]:h-full min-[0px]:rounded-none min-[0px]:border-0">
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50 min-[0px]:rounded-none">
                <h5
                  className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                  id="exampleModalFullscreenLabel"
                >
                  {movieDetail?.title}
                </h5>
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
              </div>

              <div className="relative p-4 min-[0px]:overflow-y-auto text-white">
                <div className="row-auto">
                  <div className="md:columns-3 columns-1">
                    <div className="max-w-sm rounded-lg shadow py-3">
                      <a
                        href={
                          "https://image.tmdb.org/t/p/w500" +
                          movieDetail?.poster_path
                        }
                        rel="noreferrer"
                        target="_blank"
                      >
                        <img
                          className="rounded-lg"
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            movieDetail?.poster_path
                          }
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="py-4">
                      <div>
                        <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-3xl">
                          <span className="bg-gradient-to-r from-neutral-200 via-violet-600 to-violet-600 bg-clip-text text-transparent">
                            {movieDetail?.title}
                          </span>
                        </h1>
                      </div>
                      <div>
                        {movieDetail?.genres.map((value, index) => (
                          <span key={value.id}>
                            {value.name}
                            {index !== movieDetail.genres.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div
                        x-data="scrollProgress"
                        className="inline-flex items-center justify-center overflow-hidden rounded-full bottom-5 left-5"
                      >
                        <svg className="w-20 h-20">
                          <circle
                            className="text-gray-300"
                            strokeWidth="5"
                            stroke="currentColor"
                            fill="transparent"
                            r="30"
                            cx="40"
                            cy="40"
                          />
                          <circle
                            className="text-green-800"
                            strokeWidth="5"
                            strokeDasharray={30 * 2 * Math.PI}
                            strokeDashoffset={
                              movieDetail?.vote_average !== undefined
                                ? 30 * 2 * Math.PI -
                                  ((movieDetail.vote_average * 10) / 100) *
                                    30 *
                                    2 *
                                    Math.PI
                                : ""
                            }
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="30"
                            cx="40"
                            cy="40"
                          />
                        </svg>
                        <span
                          className="absolute text-xl text-white"
                          x-text={100}
                        >
                          {movieDetail?.vote_average !== undefined
                            ? Math.floor(movieDetail?.vote_average * 10) + "%"
                            : ""}
                        </span>
                      </div>
                      <span className="text-current">Voting Score</span>
                    </div>
                    <div className="py-2 ">
                      <span className="italic text-gray-400">
                        {movieDetail?.tagline}
                      </span>
                    </div>

                    <div className="py-2">
                      <span className="text-2xl">Overview</span>
                      <br />
                      <span className="text-gray-400">
                        {movieDetail?.overview}
                      </span>
                    </div>
                    <div className="py-2">
                      <span className="text-2xl">Status</span>
                      <br />
                      <span className="text-gray-400">
                        {movieDetail?.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <SimilarMovies movieID={movieDetail.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
};
