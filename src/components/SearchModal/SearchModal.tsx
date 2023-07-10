import React from "react";
import { Movie } from "../../interfaces/MovieInterface";

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
  React.useEffect(() => {
    if (IsOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [IsOpen]);

  return (
    <>
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
                  <div className="columns-4">
                    {movies.map((value, index) => {
                      if (value.poster_path === null) {
                        return <div></div>;
                      }
                      return (
                        <div
                          className="max-w-sm rounded-lg shadow py-3"
                          key={index}
                        >
                          <a
                            href={
                              "https://image.tmdb.org/t/p/w500" +
                              value?.poster_path
                            }
                            rel="noreferrer"
                            target="_blank"
                          >
                            <img
                              className="rounded-lg"
                              src={
                                "https://image.tmdb.org/t/p/w500" +
                                value?.poster_path
                              }
                              alt=""
                            />
                          </a>
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
      </div>
    </>
  );
};
