export const NameQuestion = ({ name, setName }) => {
  return (
    <div className="py-2 flex flex-col">
      <label className="pb-2">Name</label>
      <input
        className="p-2 text-black"
        type="text"
        placeholder="username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
};

/**
 *
 * @param {{
 *  sequence: number
 *  questions: string[]
 *  answersChoices: string[][]
 *  setAnswers: (answers: string[]) => void
 * }} params
 * @returns
 */
export const Question = ({
  sequence,
  questions,
  answersChoices,
  answers,
  setAnswers,
}) => {
  const index = sequence - 2;
  const question = questions[index];
  const choices = answersChoices[index];
  const answer = answers[index];
  return (
    <div className="py-2 flex flex-col">
      <label className="pb-2">{question}</label>
      {choices ? (
        <>
          {choices.map((a, j) => (
            <button
              key={j}
              type="button"
              onClick={() => {
                setAnswers((temp) => [
                  ...temp.slice(0, index),
                  a,
                  ...temp.slice(index + 1),
                ]);
              }}
              className="border-2 hover:bg-gray-600"
            >
              {a}
            </button>
          ))}
          <input
            className="p-2 text-black"
            type="text"
            placeholder="your answer..."
            value={answer}
            onChange={(e) =>
              setAnswers((temp) => [
                ...temp.slice(0, index),
                e.target.value,
                ...temp.slice(index + 1),
              ])
            }
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
