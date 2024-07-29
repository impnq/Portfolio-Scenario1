import React from "react";
import { Section } from "./Section";
import { useRef, useState } from "react";

export const BlogSection = () => {
  return (
    <Section>
      <h2 className="text-5xl font-bold font-[K2D] text-gray-200">My Story</h2>
      <div
        className={`
                      mt-8 ms-4 p-3 rounded-md w-full max-w-full h-screen
                      bg-gradient-to-b from-[#F55F33] to-[#673AE8]
              `}
      >
        <div
          className={`
                      py-5 px-8 rounded-md bg-white w-full max-w-full h-full
                      flex flex-col 
              `}
        >
          <div className="flex justify-around w-full">
            <img
              className="w-12 h-12 rounded-full mt-1 ms-14"
              src="/Images/avatar.jpg"
              alt="Rounded avatar"
            />

            <div className="w-1/12" />
            <div className="flex flex-row items-center w-1/2">
              <h1
                className={`
                                w-11/12
                                text-2xl font-semibold leading-snug p-3 px-8 rounded-full
                                shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]
                            `}
              >
                <span className="bg-gradient-to-r from-[#FF5F5F] via-[#00AB75] to-[#85B6FF] bg-clip-text text-transparent">
                  What’s on your mind ?
                </span>
              </h1>
              <div className="h-4/6 mx-10 w-0.5 bg-gray-300"></div>
            </div>

            <div className="flex flex-row me-14">
              <div className="flex flex-row items-center me-5">
                <img
                  className="mx-4"
                  src="/Images/video.png"
                  alt="Rounded avatar"
                />
                <p className="text-[#FF0000] font-medium text-2xl">Video</p>
              </div>
              <div className="flex flex-row items-center me-5">
                <img
                  className="mx-4"
                  src="/Images/photo.png"
                  alt="Rounded avatar"
                />
                <p className="text-[#00AB75] font-medium text-2xl">Photo</p>
              </div>
              <div className="flex flex-row items-center me-5">
                <img
                  className="mx-4"
                  src="/Images/docs.png"
                  alt="Rounded avatar"
                />
                <p className="text-[#4A82E9] font-medium text-2xl">Document</p>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 h-1 bg-gray-300"></div>

          <div className="flex flex-col overflow-y-auto p-4 h-full">
            <ul className="ms-10">
              <li>
                <Feature />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const Feature = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between">
        <div className="flex flex-row items-center">
          <h1
            className={`
                          text-xl font-semibold leading-snug 
                          text-black
                      `}
          >
            Feature Article
          </h1>
          <div
            className="w-10 bg-black ms-3 mt-2"
            style={{ height: 1.5 }}
          ></div>
        </div>

        <div className="flex flex-row items-center">
          <img
            className="w-7 h-7 me-3"
            src="/Icons/Edit.png"
            alt="See More"
          />
          <h1
            className={`
                          text-xl font-semibold leading-snug 
                          text-black
                      `}
          >
            See All Articles
          </h1>
          <img
            className="w-4 h-5 mx-3 mt-1"
            src="/Icons/MoveRightArrow.png"
            alt="See More"
          />
        </div>
      </div>
      <Blogs />
    </div>
  );
};

export const Blogs = () => {
  const containerRef = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const stopDragging = () => {
    containerRef.current.classList.remove("cursor-grabbing");
    containerRef.current.classList.remove("cursor-pointer");
    containerRef.current.classList.add("cursor-grab");
    setIsDragging(false);
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
    containerRef.current.classList.remove("cursor-grab");
    containerRef.current.classList.remove("cursor-pointer");
    containerRef.current.classList.add("cursor-grabbing");
  };

  return (
    <div className="w-full h-full">
      <div
        ref={containerRef}
        className="p-2 mt-3 w-11/12 flex flex-nowrap overflow-x-scroll no-scrollbar"
        onMouseDown={startDragging}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={onDrag}
      >
        <ul className="flex">
          <li
            onMouseEnter={() => {
              containerRef.current.classList.remove("cursor-grab");
              containerRef.current.classList.remove("cursor-grabbing");
              containerRef.current.classList.add("cursor-pointer");
            }}
            onMouseLeave={() => {
              containerRef.current.classList.remove("cursor-grabbing");
              containerRef.current.classList.remove("cursor-pointer");
              containerRef.current.classList.add("cursor-grab");
            }}
            className="w-1/4 flex-shrink-0 max-w-80 mx-1 "
          >
            <Article />
          </li>
          <li className="w-1/4 flex-shrink-0 max-w-80 mx-1">
            <Article />
          </li>
          <li className="w-1/4 flex-shrink-0 max-w-80 mx-1">
            <Article />
          </li>
          <li className="w-1/4 flex-shrink-0 max-w-80 mx-1">
            <Article />
          </li>
          <li className="w-1/4 flex-shrink-0 max-w-80 mx-1">
            <Article />
          </li>
          <li className="w-1/4 flex-shrink-0 max-w-80 mx-1">
            <Article />
          </li>
        </ul>
      </div>
    </div>
  );
};

export const Article = () => {
  const handleArticleClick = () => {
    window.location.replace("http://stackoverflow.com");
  };
  return (
    <div
      // onClick={handleArticleClick}

      className="flex flex-col shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-xl px-3 "
    >
      {/* Title */}
      <div className="w-full mt-3 flex flex-row justify-between">
        <div className="flex flex-row ">
          <img
            draggable="false"
            className="w-10 h-10 rounded-full ms-1"
            src="/Images/avatar.jpg"
            alt="Rounded avatar"
          />
          <h1
            className={`
                          text-sm font-thin leading-snug ms-4
                  `}
          >
            <span className="font-semibold text-black text-md">Dasteen</span>
            <br />
            Jan 10, 2022
          </h1>
        </div>
        <img
          className="w-8 h-2 mt-3 me-2"
          src="/Icons/More.png"
          alt="More"
          draggable="false"
        />
      </div>

      {/* Content */}
      <img
        draggable="false"
        className="w-full h-44 mb-5 mt-3 me-4"
        src="/Images/BlogArticleImg.png"
        alt="Blog Article Image"
      />
      <h1 className="text-sm w-full items-start mb-2 font-regular leading-snug text-gray-400 overflow-clip">
        <span className="text-2xl font-semibold text-black">
          Grid CSS make your life easier
        </span>
      </h1>
      <h1 className="text-sm w-full items-start mb-5 font-regular leading-snug text-gray-400 overflow-clip">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fringiang
        ashzznajsjs jncnassaidiadadnad...{" "}
        <span className="text-blue-500">Read more</span>
      </h1>
    </div>
  );
};
