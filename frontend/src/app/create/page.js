"use client";
import React from "react";
import { WizButton } from "@/components/Button";
import { useMintPengu } from "./mint";

const CreatePage = () => {

  const [sequence, setSequence] = React.useState(0);
  const {mintPengu} = useMintPengu();
  // const {mintPengu} = () => {
  //   setSequence(2);
  // }

  const introAudio = React.useRef(null);
  const createCompletionAudio = React.useRef(null);

  const handleCreate = () => {
    setSequence(1);
    if (introAudio.current) {
      introAudio.current.pause();
      introAudio.current.currentTime = 0;
      introAudio.current.play();
    }
  };

  React.useEffect(() => {
    introAudio.current = new Audio("./create/intro.mp3");
    createCompletionAudio.current = new Audio("./create/create_complete.mp3");
  }, []);

  return (
    <div className="flex h-screen flex-col justify-center items-center">
      {sequence === 0 ? (
        <>
          <h1 className="text-6xl">Create your Wizzy</h1>
          <img className="mt-8 w-32 h-32" src="/game/pengu-walking.gif" />
          <WizButton type="button" className="mt-4" onClick={handleCreate}>
            Create
          </WizButton>
        </>
      ) : sequence === 1 ? (<>
        <h1 className="text-6xl">Mint your Pengu</h1>
        <p>Mint your pengu to secure</p>
        <img className="mt-8 w-32 h-32" src="/game/pengu-walking.gif" />
        <WizButton onClick={() => { mintPengu(); setSequence(2);}}>
          Mint Pengu
        </WizButton>
      </>)
      :
      (
        <>
        <h1 className="text-6xl">Create your Wizzy</h1>
        <img className="mt-8 w-32 h-32" src="/game/pengu-walking.gif" />
        <WizButton type="button" className="mt-4" onClick={handleCreate}>
          WAHOOOO
        </WizButton>
      </>
      )}
    </div>
  );
};

export default CreatePage;
