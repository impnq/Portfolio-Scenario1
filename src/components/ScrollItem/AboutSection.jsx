import React from "react";
import { Section } from "./Section";

export const AboutSection = () => {
  return (
    <>
      <Section>
        <h1 className="text-4xl md:text-6xl font-[K2D] leading-snug mt-8 md:mt-0 text-gray-200">
          Hi, We're
          <br />
          <span className="px-1 font-[K2D]">HeyDucks Team</span>
        </h1>
        <p className="text-lg text-gray-200 mt-4 font-[K2D]">
          We specialize in creating 3D visuals,
          <br />
          designing user interfaces, and developing web applications.
        </p>
        <button
          className={`bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-16`}
        >
          Contact us
        </button>
      </Section>
    </>
  );
};
