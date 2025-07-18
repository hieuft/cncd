import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { cn, user } from "@heroui/theme";

export default function ChooseMultiple({
  problemIndex,
  statement,
  optionsList,
  showAnswer,
  answer,
  usrAnswer,
}: {
  problemIndex: number;
  statement: string;
  optionsList: Array<{ key: number; body: string }>;
  showAnswer: boolean;
  answer: string;
  usrAnswer: string;
}) {
  useEffect(() => {
    function initUserAnswer() {
      const userAnswer = document.getElementById(
        "user-answer" + problemIndex.toString(),
      );
      if (userAnswer) userAnswer.innerText = "0".repeat(optionsList.length);
    }

    function updateUserAnswer(i: number, stat: boolean) {
      const userAnswer = document.getElementById(
        "user-answer" + problemIndex.toString(),
      );
      if (userAnswer) {
        const text = userAnswer.innerText;
        userAnswer.innerText =
          text.slice(0, i) + (stat ? "1" : "0") + text.slice(i + 1);
      }
    }

    function changeStatusNode() {
      const statusNode = document.getElementById(
        "status-node" + problemIndex.toString(),
      );
      if (statusNode) {
        const userAnswer = document.getElementById(
          "user-answer" + problemIndex.toString(),
        );

        if (
          userAnswer?.innerText.includes("1") &&
          !statusNode.classList.contains("bg-blue-500")
        ) {
          statusNode.classList.remove("bg-gray-200", "text-black");
          statusNode.classList.add("bg-blue-500", "text-white");
          return 1;
        } else if (
          !userAnswer?.innerText.includes("1") &&
          statusNode.classList.contains("bg-blue-500")
        ) {
          statusNode.classList.add("bg-gray-200", "text-black");
          statusNode.classList.remove("bg-blue-500", "text-white");
          return -1;
        }
      }
      return 0;
    }

    function updateNumberProblemStatus(k: number) {
      const numberNotSolve = document.getElementById("number-not-solve");
      if (numberNotSolve) {
        numberNotSolve.innerText = (
          Number(numberNotSolve.innerText) - k
        ).toString();
      }

      const numberSolve = document.getElementById("number-solved");
      if (numberSolve) {
        numberSolve.innerText = (Number(numberSolve.innerText) + k).toString();
        numberSolve?.dispatchEvent(new CustomEvent("textchanged"));
      }
    }

    if (typeof window != undefined) {
      if (!showAnswer) {
        initUserAnswer();
        for (let i = 0; ; ++i) {
          const opt = document.getElementById(
            "opt" + problemIndex.toString() + i.toString(),
          );

          if (!opt) break;
          opt.addEventListener("change", (e) => {
            updateUserAnswer(i, e.target.checked);
            updateNumberProblemStatus(changeStatusNode());
          });
        }
      } else {
        if (answer && usrAnswer) {
          const statusNode = document.getElementById(
            "status-node" + problemIndex.toString(),
          );
          if (statusNode) {
            if (answer == usrAnswer) {
              statusNode.classList.remove(
                "bg-gray-200",
                "bg-red-500",
                "text-black",
              );
              statusNode.classList.add("bg-green-500", "text-white");
            } else {
              statusNode.classList.remove(
                "bg-gray-200",
                "bg-green-500",
                "text-black",
              );
              statusNode.classList.add("bg-red-500", "text-black");
            }
          }
        }
      }
    }
  }, [showAnswer, answer, usrAnswer]);

  const normalOptionsList = () => {
    return (
      <>
        {optionsList.map((item) => (
          <label
            key={item.key}
            className={
              "block relative cursor-pointer select-none min-h-14 mb-2 pl-14 -ml-2 py-2 content-center [&:hover>span]:bg-gray-500 hover:bg-gray-100 rounded-xl"
            }
          >
            <Markdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {item.body}
            </Markdown>
            <input
              id={"opt" + problemIndex.toString() + item.key.toString()}
              type="checkbox"
              name={"choose multiple answer " + problemIndex.toString()}
              className="absolute opacity-0 cursor-pointer [&:checked+span]:!bg-blue-500"
            />
            <span className="absolute top-2/4 -translate-y-1/2 left-2 w-10 h-10 bg-gray-200 rounded-lg"></span>
          </label>
        ))}
      </>
    );
  };

  const optionsListWithAnswer = () => {
    return (
      <>
        <div>
          <span>Câu trả lời của bạn:</span>
          {optionsList.map((item) => (
            <label
              key={item.key}
              className={
                "block relative cursor-pointer select-none min-h-14 mb-2 pl-14 -ml-2 py-2 content-center [&:hover>span]:bg-gray-500 hover:bg-gray-100 rounded-xl"
              }
            >
              <Markdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {item.body}
              </Markdown>
              <input
                id={"opt-usr" + problemIndex.toString() + item.key.toString()}
                type="checkbox"
                name={"choose multiple answer usr" + problemIndex.toString()}
                className={
                  "absolute opacity-0 cursor-pointer " +
                  (usrAnswer[item.key] == answer[item.key]
                    ? "[&:checked+span]:!bg-green-500"
                    : "[&:checked+span]:!bg-red-500")
                }
                checked={usrAnswer[item.key] == "1"}
                disabled={usrAnswer[item.key] == "0"}
                readOnly
              />
              <span className="absolute top-2/4 -translate-y-1/2 left-2 w-10 h-10 bg-gray-200 rounded-lg"></span>
            </label>
          ))}
        </div>
        <div>
          <span>Đáp án:</span>
          {optionsList.map((item) => (
            <label
              key={item.key}
              className={
                "block relative cursor-pointer select-none min-h-14 mb-2 pl-14 -ml-2 py-2 content-center [&:hover>span]:bg-gray-500 hover:bg-gray-100 rounded-xl"
              }
            >
              <Markdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {item.body}
              </Markdown>
              <input
                id={"opt-ans" + problemIndex.toString() + item.key.toString()}
                type="checkbox"
                name={"choose multiple answer ans" + problemIndex.toString()}
                className="absolute opacity-0 cursor-pointer [&:checked+span]:!bg-blue-500"
                checked={answer[item.key] == "1"}
                disabled={answer[item.key] == "0"}
                readOnly
              />
              <span className="absolute top-2/4 -translate-y-1/2 left-2 w-10 h-10 bg-gray-200 rounded-lg"></span>
            </label>
          ))}
        </div>
      </>
    );
  };

  const renderOptionsList = () => {
    if (!showAnswer) return normalOptionsList();
    if (answer && usrAnswer) return optionsListWithAnswer();
  };

  return (
    <div className="flex text-lg flex-1 flex-col">
      <div className="mb-4">
        <Markdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
        >
          {statement}
        </Markdown>
      </div>

      <div>{renderOptionsList()}</div>
    </div>
  );
}
