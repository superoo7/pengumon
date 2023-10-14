"use client";

import React, { useState, useRef } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { NavigationButton } from "../components/NavigationButton";

const scenes = [
  {
    text: "",
    image: "./scenes/scene0.png",
  },
  {
    text: `In the whimsical icy domain of The Huddle, our peculiar penguin, felt a magic stirring within, a pull towards a destiny never before embraced by his kin.`,
    image: "./scenes/scene1.png",
  },
  {
    text: `Venturing into the wilderness, Wizzy collects precious resources, vital for his quest. But nature is unforgiving; every step poses risks, testing his health and determination.`,
    image: "./scenes/scene2.png",
  },
  {
    text: `By lantern's glow, Wizzy and Pudgy scholars decode ancient runes, seeking the realm's lost magic.`,
    image: "./scenes/scene3.png",
  },
  {
    text: `Shadows grow as rogue penguins cast spells. Wizzy's home, though, remains a beacon of hope.`,
    image: "./scenes/scene4.png",
  },
  {
    text: `And so, the tale of Wizzleton Frostbeak unfolds, where magic, camaraderie, and discovery await.`,
    image: "./scenes/scene5.png",
  },
];

const HomePage = () => {
  const router = useRouter();
  const [sequence, setSequence] = useState(0);
  const storylineRef = useRef(null);
  const storylineDivEl = useRef([]);
  const audioFiles = useRef([]);
  const audio = useRef(null);
  const intervalId = useRef(null);
  const lastInvocationTime = useRef(0);
  const debounceDelay = 100;

  const handlePrevClick = () => navigateStory("backward");
  const handleNextClick = () => navigateStory("forward");

  function navigateStory(direction) {
    const currentTime = Date.now();
    if (currentTime - lastInvocationTime.current < debounceDelay) {
      return;
    }
    lastInvocationTime.current = currentTime;
    let newSequence = sequence + (direction === "forward" ? 1 : -1);
    if (newSequence < 0) {
      newSequence = 0;
    } else if (newSequence >= scenes.length) {
      if (audio.current.src) audio.current.pause();
      router.push("/create");
      return;
    } else {
      clearInterval(intervalId.current);
      if (audio.current.src) audio.current.pause();
      if (newSequence === 0) {
        setSequence(newSequence);
        return;
      }

      audio.current.src = audioFiles.current[newSequence - 1].src;
      const element = storylineDivEl.current[newSequence];
      const text = element.textContent;
      element.textContent = "";
      audio.current.onloadedmetadata = function () {
        const animationDuration = audio.current.duration * 1000;
        animateText(element, text, animationDuration);
      };
      audio.current.play();
    }
    setSequence(newSequence);
  }

  function animateText(element, text, duration) {
    let index = 0;
    const intervalTime = duration / text.length;
    intervalId.current = setInterval(() => {
      element.textContent += text[index];
      index++;
      element.scrollTop = element.scrollHeight;
      if (index === text.length) {
        clearInterval(intervalId.current);
      }
    }, intervalTime);
  }

  React.useEffect(() => {
    audioFiles.current = Array.from(
      { length: scenes.length },
      (_, i) => new Audio(`./scenes/scene${i + 1}.mp3`)
    );
    audio.current = new Audio();
  }, []);

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="w-full h-screen" ref={storylineRef}>
          {scenes.map((scene, index) => {
            if (index === 0) {
              return (
                <div
                  key={index}
                  className={clsx(
                    "w-full h-full",
                    sequence === index ? "flex flex-col" : "hidden"
                  )}
                >
                  <img
                    className="w-full h-full object-cover pointer-events-none"
                    src={scene.image}
                  />
                  <div className="absolute top-[calc(50%_-_130px)] md:top-[calc(50%_-_240px)] left-1/2 transform -translate-x-1/2 w-full flex justify-center items-center">
                    <h1 className="text-6xl md:text-8xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] text-white">
                      PenguMon
                    </h1>
                  </div>
                  <div className="absolute transparent top-[calc(50%_-_60px)] md:top-[calc(50%_-_120px)] left-[calc(50%_-_120px)]">
                    <img
                      className="w-60 h-60"
                      src="/game/pengu-work.gif"
                      alt="pengu"
                    />
                  </div>
                </div>
              );
            }
            return (
              <div
                key={index}
                className={clsx(
                  `w-full h-full overflow-hidden`,
                  sequence === index ? "flex flex-col" : "hidden"
                )}
              >
                {scene.image && (
                  <img
                    className="w-full h-full object-cover pointer-events-none animate-pan"
                    src={scene.image}
                    alt={scene.text}
                  />
                )}
                <p
                  ref={(ref) => {
                    storylineDivEl.current[index] = ref;
                  }}
                  className="absolute text-4xl p-4 bottom-10 left-10 right-10 h-32 md:h-40 bg-black text-white bg-opacity-70 overflow-y-auto pointer-events-auto"
                >
                  {scene.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="absolute right-5 bottom-1/4 mb-4">
          {sequence === 0 ? (
            <button
              className="text-2xl px-5 py-2.5 mx-2.5 border-none rounded-full bg-gray-800 text-gray-100 cursor-pointer shadow-md transition-transform duration-300 ease-in-out hover:bg-gray-900 hover:shadow-lg hover:-translate-y-1.5"
              onClick={handleNextClick}
            >
              Begin
            </button>
          ) : (
            <>
              <NavigationButton label="Previous" onClick={handlePrevClick} />
              <NavigationButton
                label={
                  sequence === scenes.length - 1 ? "Create your Pengu!" : "Next"
                }
                onClick={handleNextClick}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
