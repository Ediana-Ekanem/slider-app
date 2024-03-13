import React, { useEffect, useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import {
  BiSolidChevronLeftSquare,
  BiSolidChevronRightSquare,
} from "react-icons/bi";
import peopleData from "./data";

function App() {
  const [people, setPeople] = useState(peopleData);
  const [index, setIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    if (autoSlide) {
      const intervalId = setInterval(() => {
        setIndex((prevIndex) =>
          prevIndex === people.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [autoSlide, people.length]);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? people.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex === people.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleToggleAutoSlide = () => {
    setAutoSlide((prevAutoSlide) => !prevAutoSlide);
  };

  return (
    <>
      <section>
        <div className="mt-10 text-center text-4xl mb-5 text-gray-600">
          <span className="text-[#9379f8]">/</span> Reviews
        </div>

        <div className="relative flex justify-center items-center">
          {people.map((person, idx) => {
            const { id, image: img, name, title, quote } = person;
            return (
              <article
                key={id}
                className={`w-full h-full absolute top-24 left-0 transform transition-opacity ${
                  index === idx
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="flex justify-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden">
                    <img
                      src={img}
                      alt={name}
                      className="object-cover w-full h-full rounded-full border-[4px] border-[#ddd6fe]"
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-2xl text-[#9379f8]">{name}</h4>
                  <p>{title}</p>
                  <div className="flex justify-center mx-auto w-[55%]">
                    <div className="flex items-center justify-between w-full">
                      <BiSolidChevronLeftSquare
                        size={40}
                        color="#64748b"
                        onClick={handlePrev}
                      />
                      <BiSolidChevronRightSquare
                        size={40}
                        color="#64748b"
                        onClick={handleNext}
                      />
                    </div>
                  </div>
                  <p className="text-[#718ca8] w-full mx-auto max-w-[45%]">
                    {quote}
                  </p>
                </div>
                <div className="flex justify-center mt-10">
                  <FaQuoteRight size={30} color="#8b5cf6" />
                </div>
              </article>
            );
          })}
        </div>
        <button
          className="absolute bottom-4 right-4 px-2 py-1 bg-[#9379f8] text-white rounded-md"
          onClick={handleToggleAutoSlide}
        >
          {autoSlide ? "Pause" : "Play"}
        </button>
      </section>
    </>
  );
}

export default App;
