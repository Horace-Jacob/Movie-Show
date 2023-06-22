import React from "react";
import { Movie } from "../../interfaces/MovieInterface";

interface ModalProps {
  IsOpen: boolean;
  onClose: () => void;
  movieData: Movie | undefined;
}

export const Modal: React.FC<ModalProps> = ({ IsOpen, onClose, movieData }) => {
  return (
    <div
      className={`fixed left-0 top-0 z-[1055] ${
        IsOpen ? "" : "hidden"
      } h-full w-full overflow-y-auto overflow-x-hidden outline-none`}
      tabIndex={-1}
    >
      <div
        className={`pointer-events-none relative w-auto ${
          IsOpen ? "" : "opacity-0"
        } transition-all duration-300 ease-in-out min-[0px]:m-0 min-[0px]:h-full min-[0px]:max-w-none`}
      >
        <div className="pointer-events-auto relative flex w-full flex-col rounded-md bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 min-[0px]:h-full min-[0px]:rounded-none min-[0px]:border-0">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50 min-[0px]:rounded-none">
            <h5
              className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
              id="exampleModalFullscreenLabel"
            >
              Modal title
            </h5>
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              aria-label="Close"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="bg-gradient-to-r from-neutral-800 via-neutral-800 to-emerald-800 relative p-4 min-[0px]:overflow-y-auto">
            <p className="px-10 text-center leading-[3rem]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Similique nesciunt repellat consectetur rem nam, facere, expedita
              perspiciatis accusamus beatae aliquid dicta fugit ab minima qui
              inventore. Animi tenetur tempore consequuntur! Ducimus,
            </p>
          </div>

          <div className="mt-auto flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50 min-[0px]:rounded-none">
            <button
              type="button"
              className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
              data-te-modal-dismiss
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
