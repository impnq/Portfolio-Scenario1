import React, { useEffect, useRef, useState } from "react";

const CURSOR_SPEED = 0.08;

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

export const CursorController = () => {
  const cursorOutline = useRef(null);
  const [hoverButton, setHoverButton] = useState(false);

  const animate = () => {
    let distX = mouseX - outlineX;
    let distY = mouseY - outlineY;

    outlineX += distX * CURSOR_SPEED;
    outlineY += distY * CURSOR_SPEED;

    if (cursorOutline.current) {
      cursorOutline.current.style.left = `${outlineX}px`;
      cursorOutline.current.style.top = `${outlineY}px`;
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const onMouseMove = (event) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
    };

    const onMouseOver = (event) => {
      const target = event.target;
      const tagName = target.tagName.toLowerCase();
      const parentTagName = target.parentElement?.tagName.toLowerCase();

      if (
        tagName === "button" ||
        parentTagName === "button" ||
        tagName === "input" ||
        tagName === "textarea"
      ) {
        setHoverButton(true);
      } else {
        setHoverButton(false);
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    const animateId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animateId);
    };
  }, []);

  return (
    <div
      ref={cursorOutline}
      className={`fixed z-50 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-300
      ${
        hoverButton
          ? "bg-red-500 w-6 h-6 scale-150 shadow-lg shadow-red-500/50"
          : "bg-red-400 w-3 h-3 shadow-md shadow-red-400/50"
      }`}
    ></div>
  );
};
