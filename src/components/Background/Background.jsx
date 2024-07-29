import React from "react";
import "./Background.css"

const Background = () => {
    return (
        <div className="gradient-background absolute inset-0 z-[-1]">
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
        </div>
      </div>
    );
};

export default Background;