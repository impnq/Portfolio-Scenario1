import React, { useState } from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "exp",
      title: "Experiences",
    },
    {
      id: "project",
      title: "Project",
    },
    {
      id: "story",
      title: "Story",
    },
    {
      id: "schedule",
      title: "Schedule",
    },
    {
      id: "contact",
      title: "Contact",
    },
    {
      id: "linkedln",
      title: "Linkedln",
    },
  ];

  return (
    <div className="relative">
      <button
        className="fixed top-8 right-10 z-20 rounded-md focus:outline-none "
        onClick={toggleNavbar}
      >
        <img
          src="../src/assets/images/list.png"
          alt="Button Image"
          className={`h-8 w-8 transition-transform duration-300 ${
            isOpen ? "transform rotate-90" : "transform -rotate-90"
          }`}
        />
      </button>

      <nav className={`${isOpen ? "active" : ""}`}>
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-violet-500" : "text-white"
              } hover:cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
