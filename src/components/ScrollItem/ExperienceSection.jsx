/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "./Section";

const experiences = [
  {
    company: "BOSCH",
    logo: "/Images/Bosch_logo.png", // You'll need to add these logo files
    period: "Jan 2022 - Jun 2022",
    jobTitle: "Software Engineer",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia quae possimus nemo ea itaque magni autem iste dolorem? Necessitatibus, beatae. Et error magni quis repellendus, praesentium quaerat sint."
  },
  {
    company: "nab",
    logo: "/Images/Nab_logo.png",
    period: "Jul 2022 - Dec 2022",
    jobTitle: "Software Engineer",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores incidunt cum aspernatur maxime sunt porro! Repellat eius placeat natus laudantium nisi temporibus voluptatum? Suscipit, porro."
  },
  {
    company: "VNG",
    logo: "/Images/Vng_logo.png",
    period: "Jun 2023 - Dec 2023",
    jobTitle: "Software Engineer",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, inventore consequuntur voluptatem sunt eius culpa dolorum consectetur fugiat doloribus facilis, similique quasi voluptates repellendus."
  },
  {
    company: "Garena",
    logo: "/Images/Garena_logo.png",
    period: "Jun 2024 - Now",
    jobTitle: "Software Engineer",
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores quaerat quos, vero perspiciatis esse ducimus vel minima, labore provident quia corrupti error quo iste enim beatae nostrum numquam!"
  },
];

export const ExperienceSection = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const handleClickWorkPeriod = (exp) => {
    setSelectedExperience(exp);
  };

  const handleCloseDetail = () => {
    setSelectedExperience(null);
  };

  const handleEvaluate = () => {
    setShowEvaluation(true);
  };

  const handleCloseEvaluation = () => {
    setShowEvaluation(false);
  };

  const AddRatingForm = ({ experience, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [evaluation, setEvaluation] = useState('');
    const [rating, setRating] = useState(4.5);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, position, evaluation, rating });
    };
  
    return (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-3xl p-6 w-full max-w-md mx-4 border-gradient-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <img src={experience.logo} alt={experience.company} className="w-16 object-contain" />
            <div className="flex items-center">
              <label className="block text-xl font-bold mb-2 mr-2 color-gradient">Rating:</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                className="w-16 p-2 border rounded border-gradient-3"
              />
            </div>
            <button onClick={onClose} className="text-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#c00f0d" className="size-8"> <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Name:</label>
              <div className="flex border-gradient-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-grow p-2 border rounded-l"
                  placeholder="Your name"
                />
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded-r flex items-center"
                >
                  <span className="mr-2">LinkedIn</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Position:</label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full p-2 border rounded border-gradient-3"
                placeholder="Your position"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Evaluation:</label>
              <textarea
                value={evaluation}
                onChange={(e) => setEvaluation(e.target.value)}
                className="w-full p-2 border rounded border-gradient-3"
                rows="4"
                placeholder="Your evaluation"
              ></textarea>
            </div>
            <div className="flex justify-center w-full mt-4">
              <button
                type="submit"
                className="font-bold border-2 border-purple-600 text-black px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Evaluate
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  const EvaluationPopup = ({ experience, onClose }) => {
    const [showAddRatingForm, setShowAddRatingForm] = useState(false);

    const handleAddRating = () => {
      setShowAddRatingForm(true);
    };

    const handleCloseAddRatingForm = () => {
      setShowAddRatingForm(false);
    };

    const handleSubmitRating = (ratingData) => {
      // Here you would typically send this data to your backend
      console.log('New rating submitted:', ratingData);
      setShowAddRatingForm(false);
      // Optionally, you could update the local state to show the new rating immediately
    };
    return (
      <motion.div
        // className="bg-black bg-opacity-50 bg-opacity-50 flex items-center justify-center z-50"
        className="flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-3xl p-6 max-w-4xl w-full mx-4 border-gradient-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center align-center mb-6">
            <div className="flex items-center">
              <img src={experience.logo} alt={experience.company} className="w-16 object-contain mr-4" />
              <div>
                <h2 className="text-2xl font-bold color-gradient">{experience.jobTitle}</h2>
                <p className="font-bold color-gradient-2">{experience.period}</p>
              </div>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold color-gradient-2">Rating: 4.7/5</h2>
            </div>
            <div className="mb-4">
              <button 
                className="bg-gradient text-white font-bold px-4 py-2 rounded-lg mt-2"
                onClick={handleAddRating}
              >
                Add Rating
              </button>
            </div>
            <button onClick={onClose} className="text-2xl text-red">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#c00f0d" className="size-8"> <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Jessica Phan", avt: "/Images/avatar.jpg", role: "Project Manager", rating: 4.5, date: "Jun 12th, 2024" },
              { name: "Daniel Vo", avt: "/Images/avatar.jpg", role: "Game Developer", rating: 5, date: "Jun 28th, 2024" },
              { name: "Sam Nguyen", avt: "/Images/avatar.jpg", role: "Game Developer", rating: 4, date: "Jul 14th, 2024" }
            ].map((reviewer, index) => (
              <div key={index} className="border-gradient-2 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 mr-4">
                    <img src={reviewer.avt} alt="Avatar" className="rounded-full" />
                  </div>
                  <div>
                    <h2 className="font-bold color-gradient" style={{ fontSize: '16px' }}>{reviewer.name}</h2>
                    <p className="font-bold color-gradient-2" style={{ fontSize: '13px' }}>{reviewer.role}</p>
                  </div>
                </div>
                <p className="font-bold color-gradient-2">Rating: {reviewer.rating}</p>
                <p className="mt-2">Lorem ipsum, dolor sit amet con sectetur adipi sicing elit. Rerum praes entium eaque eum velit quia? Ipsum sequi, repell endus aspe rnatur inventore nobis facere nisi nes ciunt eveniet, magni quisquam ab quis! Nobis, officiis.</p>
                <p className="mt-2 color-gradient-2 font-bold text-end">{reviewer.date}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <AnimatePresence>
        {showAddRatingForm && (
          <AddRatingForm
            experience={experience}
            onClose={handleCloseAddRatingForm}
            onSubmit={handleSubmitRating}
          />
        )}
      </AnimatePresence>
      </motion.div>
    );
  };

  const WorkDetailBox = ({ experience, onClose, onEvaluate }) => {
    return (
      <motion.div 
        className="bg-white rounded-3xl px-6 py-4 w-full shadow-lg border-gradient" 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-4">
          <img src={experience.logo} alt={experience.company} className="w-16 object-contain mr-4" />
          <div>
            <h6 className="font-bold color-gradient" style={{ fontSize: '18px' }}>{experience.jobTitle}</h6>
            <p className="font-bold color-gradient-2" style={{ fontSize: '13px' }}>{experience.period}</p>
          </div>
        </div>
        <p className="mb-2 text-gray-700 font-bold" style={{ fontSize: '13px' }}>{experience.description}</p>
        <div className="flex justify-center w-full mt-4">
          <button 
            className="font-bold border-2 border-purple-600 px-6 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
            style={{ fontSize: '13px' }}
            onClick={(e) => {
              e.stopPropagation();
              // window.open('https://www.linkedin.com/in/phan-nhu-quynh/', '_blank')
              onEvaluate();
            }}
          >
            Evaluation
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div id="exp" className="w-full h-full relative">
      <Section style={{ width: '100%', position: 'relative' }}>
        {/* <h2 className="text-5xl font-bold text-white">Experiences</h2> */}
        <h2 className="text-4xl md:text-5xl font-[K2D] leading-snug mt-8 md:mt-0 text-gray-200">
          Experiences
        </h2>
        <motion.div whileInView="visible" className="w-100pc h-100pc" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              &lt;
            </div>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              &gt;
            </div>
          </div> */}
          <div className="exp-section relative space-y-4 w-100pc">
            <div className="h-1 bg-white absolute top-1/2 left-0 right-0 transform -translate-y-1/2"></div>
            {experiences.map((exp, index) => (
              // <div key={index} className="relative" style={{top: index % 2 === 0 ? "-40px" : "40px"}}>
              <div key={index} className="relative w-100pc">
                  <div 
                    className="work-period absolute left-1/2 transform -translate-x-1/2 w-100pc" 
                    style={{
                      top: index % 2 === 0 ? "100%" : "auto", 
                      bottom: index % 2 === 1 ? "100%" : "auto",
                      marginTop: index % 2 === 0 ? "80px" : "0px", 
                      marginBottom: index % 2 === 1 ? "80px" : "0px",
                      cursor: 'pointer'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickWorkPeriod(exp)
                    }}
                  >
                    <AnimatePresence>
                      {selectedExperience === exp ? (
                        <WorkDetailBox key={exp.company} experience={exp} onClose={handleCloseDetail} onEvaluate={handleEvaluate} />
                      ) : (
                        <motion.div 
                          key={exp.company}
                          className="work-period" 
                          onClick={() => handleClickWorkPeriod(exp)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img src={exp.logo} alt={exp.company} className="object-contain logo-company mx-auto" />
                          <strong className="text-white text-center text-lg block mt-2">{exp.period}</strong>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                <div 
                  className="ver-col bg-white rounded-full absolute left-1/2 top-1/2"
                  style={{
                    transform: index % 2 === 0 ? 'translate(-15%, -15%)' : 'translate(-115%, -115%)',
                  }}
                ></div>
              </div>
            ))}
          </div>
        </motion.div>
        <AnimatePresence>
          {showEvaluation && selectedExperience && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <EvaluationPopup experience={selectedExperience} onClose={handleCloseEvaluation} />
            </div>
          )}
        </AnimatePresence>
      </Section>
    </div>
  );
};