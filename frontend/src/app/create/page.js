"use client";
import React from "react";
import { NO_OF_QUESTIONS, useCreatePage } from "./api";
import { NavigationButton } from "@/components/NavigationButton";
import { NameQuestion, Question } from "./questions";
import { useMintPengu } from "../web3/pengumon";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

const randomId = () => Math.floor(Math.random() * 1000000);

const CreatePage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { mintPengu } = useMintPengu();
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
      const statsGenerate = async () => {
        const statsResponse = await statsGenerator({ summary: content });
        const temp = JSON.parse(statsResponse.content);
        const totalPoints =
          temp.cuteness + temp.intelligence + temp.magic + temp.strength;
        setStats({
          cuteness: Math.round((temp.cuteness / totalPoints) * 20),
          intelligence: Math.round((temp.intelligence / totalPoints) * 20),
          magic: Math.round((temp.magic / totalPoints) * 20),
          strength: Math.round((temp.strength / totalPoints) * 20),
          reasoning: temp.reasoning,
        });
        setLoading(false);
        setSequence((s) => s + 1);
        if (createCompletionAudio.current) createCompletionAudio.current.play();
      };
      try {
        await statsGenerate();
      } catch (err) {
        await statsGenerate();
      }
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
          onSubmit={async (e) => {
            e.preventDefault();
            if (!isConnected) {
              alert("Please connect your wallet to mint your Wizzy!");
              return;
            }
            await mintPengu({
              args: [
                name,
                Number(stats.cuteness),
                Number(stats.intelligence),
                Number(stats.magic),
                Number(stats.strength),
              ],
            });
            router.push("/game");
          }}
          className="w-1/2 flex flex-col items-center justify-center"
        >
          <div className="p-4 text-3xl">{summary}</div>
          {stats ? (
            <>
              <div className="flex p-4">
                <div className="flex flex-col w-1/2">
                  <h5 className="text-3xl pb-4">Wizzy&apos;s Stats</h5>
                  <span className="text-lg">Cuteness: {stats.cuteness}</span>
                  <span className="text-lg">
                    Intelligence: {stats.intelligence}
                  </span>
                  <span className="text-lg">Magic: {stats.magic}</span>
                  <span className="text-lg">Strength: {stats.strength}</span>
                </div>
                <div className="w-1/2">
                  <span className="text-lg">{stats.reasoning}</span>
                </div>
              </div>
              <div className="flex pt-4 justify-center">
                <NavigationButton type="submit" label="Mint your Wizzy" />
              </div>
            </>
          ) : (
            <div>Finalizing your pengu...</div>
          )}
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
