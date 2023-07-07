import React from "react";

interface OverlayProps {
  IsOpen: boolean;
  LoadingColor: string;
}

export const Overlay: React.FC<OverlayProps> = ({ IsOpen, LoadingColor }) => {
  React.useEffect(() => {
    if (IsOpen) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, [IsOpen]);

  return (
    <div
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      className={`fixed ${
        IsOpen ? "" : "hidden"
      } w-full h-full top-0 left-0 right-0 bottom-0 z-20 cursor-pointer`}
    >
      <div className="lds-ellipsis absolute top-1/2 left-1/2">
        <div className={LoadingColor}></div>
        <div className={LoadingColor}></div>
        <div className={LoadingColor}></div>
        <div className={LoadingColor}></div>
      </div>
    </div>
  );
};
