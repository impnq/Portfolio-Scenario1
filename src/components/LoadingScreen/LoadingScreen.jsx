import React from "react";
import PropTypes from "prop-types";
import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export const LoadingScreen = (props) => {
  const { started, setStarted } = props;
  const { progress, total, loaded, item } = useProgress();

  useEffect(() => {
    console.log(progress, total, loaded, item);
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 1000);
    }
  }, [progress, total, loaded, item, setStarted]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
        flex items-center justify-center bg-red-50 
        ${started ? "opacity-0" : "opacity-100"}`}
    >
      <div className="font-bold text-red-400 relative" style={{fontSize: "100px"}}>
        <div
          className="absolute left-0 top-0 overflow-hidden text-clip transition-all duration-1000"
          style={{
            width: `${progress}%`,
          }}
        >
          <span className="whitespace-nowrap">HeyDucks Portfolio</span>
        </div>
        <div className="opacity-40 whitespace-nowrap">HeyDucks Portfolio</div>
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  started: PropTypes.bool.isRequired,
  setStarted: PropTypes.func.isRequired,
};
