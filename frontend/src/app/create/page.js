"use client";
import React from "react";
import { useCreatePage } from "./api";
import { NavigationButton } from "../page";
import { NameQuestion, Question } from "./questions";
import { useMintPengu } from "./mint";

export const NO_OF_QUESTIONS = 1;
const randomId = () => Math.floor(Math.random() * 1000000);

const MintPengu = ({ setSequence }) => {
  const { mintPengu } = useMintPengu();
  return (
    <>
      <h1 className="text-6xl">Mint your Pengu</h1>
      <p>Mint your pengu to secure</p>
      <img className="mt-8 w-32 h-32" src="/game/pengu-walking.gif" />
      <WizButton
        onClick={() => {
          mintPengu();
          // setSequence(2);
        }}
      >
        Mint Pengu
      </WizButton>
    </>
  );
};

const SuccessfulScreen = () => {
  return (
    <>
      <h1 className="text-6xl">Create your Wizzy</h1>
      <img className="mt-8 w-32 h-32" src="/game/pengu-walking.gif" />
      <WizButton type="button" className="mt-4" onClick={handleCreate}>
        WAHOOOO
      </WizButton>
    </>
  );
};

const CreatePage = () => {
  const introAudio = React.useRef(null);
  const createCompletionAudio = React.useRef(null);
  const [name, setName] = React.useState(`Wizzy${randomId()}`);
  const [loading, setLoading] = React.useState(false);
  const {
    answersGenerator,
    interviewQuestionGenerator,
    summaryGenerator,
    statsGenerator,
  } = useCreatePage();
  const [sequence, setSequence] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [answersChoices, setAnswersChoices] = React.useState([]);
  const [summary, setSummary] = React.useState("");
  const [stats, setStats] = React.useState(null);
  const [totalPoints, setTotalPoints] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      sequence === 2 + NO_OF_QUESTIONS ||
      (questions.length === NO_OF_QUESTIONS &&
        answers.length === NO_OF_QUESTIONS)
    ) {
      setLoading(true);
      const response = await summaryGenerator({ name, questions, answers });
      const content = response.content;
      setSummary(content);
      const statsResponse = await statsGenerator({ summary: content });
      const temp = JSON.parse(statsResponse.content);
      setStats(temp);
      const tempTotalPoints =
        temp.cuteness + temp.intelligence + temp.magic + temp.strength;
      console.log(tempTotalPoints);
      setTotalPoints(tempTotalPoints);
      setLoading(false);
      setSequence((s) => s + 1);
      if (createCompletionAudio.current) createCompletionAudio.current.play();
    } else if (sequence === questions.length + 1) {
      setLoading(true);
      const response = await interviewQuestionGenerator({
        name,
        questions,
        answers,
      });
      /**
       * @type {string}
       */
      const content = response.content;
      const questionForUser = content.split("?")[0] + "?";
      setQuestions((q) => [...q, questionForUser]);
      setAnswers((a) => [...a, ""]);
      setSequence((s) => s + 1);
      const ans = (await answersGenerator({ question: questionForUser }))
        .content;
      const answerPattern = /(?<=\d\.\s)(.*?)(?=(?:\s*\d\.)|$)/gs;
      const formattedAnswers = ans.match(answerPattern);
      setAnswersChoices((a) => [...a, formattedAnswers]);
      setLoading(false);
    } else {
      setSequence((s) => s + 1);
    }
  };

  React.useEffect(() => {
    introAudio.current = new Audio("./create/intro.mp3");
    createCompletionAudio.current = new Audio("./create/create_complete.mp3");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-6xl md:text-8xl py-8 text-center">
        Create Your Wizzy
      </h1>
      <img className="mt-8 w-32 h-32" src="/game/pengu-walking.gif" />
      {summary ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Work in progress!");
          }}
          className="w-1/2 flex flex-col items-center justify-center"
        >
          <div className="p-4 text-3xl">{summary}</div>
          {stats && totalPoints && (
            <div className="flex flex-col">
              <span>
                Cuteness: {Math.round(stats.cuteness / totalPoints * 20)}
              </span>
              <span>
                Intelligence:{" "}
                {Math.round(stats.intelligence / totalPoints * 20)}
              </span>
              <span>Magic: {Math.round(stats.magic / totalPoints * 20)}</span>
              <span>
                Strength: {Math.round(stats.strength / totalPoints * 20)}
              </span>
              <span>{stats.reasoning}</span>
            </div>
          )}
          <div className="flex pt-4 justify-center">
            <NavigationButton type="submit" label="Mint your Wizzy" />
          </div>
        </form>
      ) : sequence === 0 ? (
        <div className="pt-2">
          <NavigationButton
            label="Begin"
            onClick={() => {
              setSequence(1);
              if (introAudio.current) {
                introAudio.current.pause();
                introAudio.current.currentTime = 0;
                introAudio.current.play();
              }
            }}
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="py-4 flex flex-col w-60 text-2xl"
        >
          {sequence === 1 ? (
            <NameQuestion name={name} setName={setName} />
          ) : (
            <Question
              sequence={sequence}
              questions={questions}
              answersChoices={answersChoices}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}
          <div className="pt-4 flex justify-center">
            {sequence !== 1 && (
              <NavigationButton
                label="Back"
                onClick={() => {
                  setSequence((s) => s - 1);
                }}
              />
            )}
            <NavigationButton
              label={
                loading
                  ? "Loading..."
                  : sequence === questions.length + 1
                  ? "Submit"
                  : "Next"
              }
              type="submit"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default CreatePage;
