import { useMutation } from "@tanstack/react-query";
export const NO_OF_QUESTIONS = 5;

export const getPrompt = (id, input) => {
  return fetch("https://pms.chasm.net/api/prompts/execute/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input,
    }),
  }).then((res) => res.json());
};

export const useCreatePage = () => {
  const { mutateAsync: answersGenerator } = useMutation(
    ["answers-generator"],
    async ({ question }) => {
      return getPrompt(
        170,
        {
          question,
        },
        {
          retry: 1,
          retryDelay: 0,
        }
      );
    }
  );

  const { mutateAsync: interviewQuestionGenerator } = useMutation(
    ["interview-question-generator"],
    async ({ name, questions: qs, answers: as }) => {
      const userResponses = qs
        .map(
          (q, i) =>
            `${q}</s><s>
[INST]${as[i]}[/INST]
`
        )
        .join("");

      return getPrompt(
        168,
        {
          name,
          user_response: userResponses,
          no_of_qestions: NO_OF_QUESTIONS,
        },
        {
          retry: 2,
          retryDelay: 0,
        }
      );
    }
  );

  const { mutateAsync: summaryGenerator } = useMutation(
    ["summary-generator"],
    async ({ name, questions: qs, answers: as }) => {
      const interview = qs
        .map((q, i) => {
          const a = as[i];
          return `Q: ${q}\nA: ${a}\n`;
        })
        .join("");

      return getPrompt(169, {
        name,
        interview,
      });
    },
    {
      retry: 2,
      retryDelay: 0,
    }
  );

  const { mutateAsync: statsGenerator } = useMutation(
    ["stats-generator"],
    async ({ summary }) => {
      return getPrompt(193, {
        summary,
      });
    },
    {
      retry: 2,
      retryDelay: 0,
    }
  );

  return {
    answersGenerator,
    interviewQuestionGenerator,
    summaryGenerator,
    statsGenerator
  };
};
