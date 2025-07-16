import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { useEffect } from "react";
import { normalize } from "node:path/posix";

export default function TrueFalse({
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
      if (userAnswer) userAnswer.innerText = "_".repeat(optionsList.length);
    }

    function updateUserAnswer(i: number, status: string) {
      const userAnswer = document.getElementById(
        "user-answer" + problemIndex.toString(),
      );
      if (userAnswer) {
        const text = userAnswer.innerText;
        userAnswer.innerText = text.slice(0, i) + status + text.slice(i + 1);
      }
    }

    function changeStatusNode() {
      const statusNode = document.getElementById(
        "status-node" + problemIndex.toString(),
      );
      if (statusNode && !statusNode.classList.contains("bg-blue-500")) {
        statusNode.classList.remove("bg-gray-200", "text-black");
        statusNode.classList.add("bg-blue-500", "text-white");
        return 1;
      }
      return 0;
    }

    function updateNumberProblemStatus(k: number) {
      if (!k) return;
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

    if (!showAnswer) {
      initUserAnswer();
      for (let i = 0; ; ++i) {
        const optTrue = document.getElementById(
          "opt-true" + problemIndex.toString() + i.toString(),
        );

        if (!optTrue) break;

        optTrue.addEventListener("change", () => {
          updateUserAnswer(i, optTrue.checked ? "1" : "0");
          updateNumberProblemStatus(changeStatusNode());
        });

        const optFalse = document.getElementById(
          "opt-false" + problemIndex.toString() + i.toString(),
        );

        if (!optFalse) break;

        optFalse.addEventListener("change", () => {
          updateUserAnswer(i, optFalse.checked ? "0" : "1");
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
            statusNode.classList.remove("bg-gray-200", "text-black");
            statusNode.classList.add("bg-green-500", "text-white");
          } else {
            statusNode.classList.remove("bg-gray-200", "text-black");
            statusNode.classList.add("bg-red-500", "text-black");
          }
        }
      }
    }
  }, [showAnswer, answer, usrAnswer]);

  const normalOptionsList = () => {
    return (
      <>
        <table className="w-full [&_td]:border-1 [&_td]:border-gray-300 [&_th]:border-1 [&_th]:border-gray-300">
          <thead>
            <tr>
              <th></th>
              <th className="w-14">Đúng</th>
              <th className="w-14">Sai</th>
            </tr>
          </thead>
          <tbody>
            {optionsList.map((item) => (
              <tr key={item.key}>
                <td className="p-2">
                  <Markdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {item.body}
                  </Markdown>
                </td>
                <td>
                  <label
                    className={
                      "block relative cursor-pointer select-none min-h-14 pl-14 py-2 content-center [&:hover>span]:bg-gray-500 rounded-xl"
                    }
                  >
                    <input
                      id={
                        "opt-true" +
                        problemIndex.toString() +
                        item.key.toString()
                      }
                      type="radio"
                      name={
                        "true false " +
                        problemIndex.toString() +
                        item.key.toString()
                      }
                      className="absolute opacity-0 cursor-pointer [&:checked+span]:!bg-blue-500"
                    />
                    <span className="absolute top-2/4 -translate-y-1/2 left-2 w-10 h-10 bg-gray-200 rounded-full"></span>
                  </label>
                </td>
                <td>
                  <label
                    className={
                      "block relative cursor-pointer select-none min-h-14 pl-14 py-2 content-center [&:hover>span]:bg-gray-500 rounded-xl"
                    }
                  >
                    <input
                      id={
                        "opt-false" +
                        problemIndex.toString() +
                        item.key.toString()
                      }
                      type="radio"
                      name={
                        "true false " +
                        problemIndex.toString() +
                        item.key.toString()
                      }
                      className="absolute opacity-0 cursor-pointer [&:checked+span]:!bg-blue-500"
                    />
                    <span className="absolute top-2/4 -translate-y-1/2 left-2 w-10 h-10 bg-gray-200 rounded-full"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  const optionsListWithAnswer = () => {
    return (
      <>
        <div>
          <span>Câu trả lời của bạn:</span>
          <table className="w-full [&_td]:border-1 [&_td]:border-gray-300 [&_th]:border-1 [&_th]:border-gray-300">
            <thead>
              <tr>
                <th></th>
                <th className="w-14">Đúng</th>
                <th className="w-14">Sai</th>
              </tr>
            </thead>
            <tbody>
              {optionsList.map((item) => (
                <tr key={item.key}>
                  <td className="p-2">
                    <Markdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {item.body}
                    </Markdown>
                  </td>
                  <td>
                    <label
                      className={
                        "block relative cursor-pointer select-none min-h-14 pl-14 py-2 content-center [&:hover>span]:bg-gray-500 rounded-xl"
                      }
                    >
                      <input
                        id={
                          "opt-true-usr" +
                          problemIndex.toString() +
                          item.key.toString()
                        }
                        type="radio"
                        name={
                          "true false usr" +
                          problemIndex.toString() +
                          item.key.toString()
                        }
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
                      <span className="absolute top-2/4 -translate-y-1/2 left-2 w-10 h-10 bg-gray-200 rounded-full"></span>
                    </label>
                  </td>
                  <td>
                    <label
                      className={
                        "block relative cursor-pointer select-none min-h-14 pl-14 py-2 content-center [&:hover>span]:bg-gray-500 rounded-xl"
                      }
                    >
                      <input
                        id={
                          "opt-false-usr" +
                          problemIndex.toString() +
                          item.key.toString()
                        }
                        type="radio"
                        name={
                          "true false usr" +
                          problemIndex.toString() +
                          item.key.toString()
                        }
                        className={
                          "absolute opacity-0 cursor-pointer " +
                          (usrAnswer[item.key] == answer[item.key]
                            ? "[&:checked+span]:!bg-green-500"
                            : "[&:checked+span]:!bg-red-500")
                        }
                        checked={usrAnswer[item.key] == "0"}
                        disabled={usrAnswer[item.key] == "1"}
                        readOnly
                      />
                      <span className="absolute top-2/4 -translate-y-1/2 left-2 w-10 h-10 bg-gray-200 rounded-full"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <div>
          <span>Đáp án:</span>
          <table className="w-full [&_td]:border-1 [&_td]:border-gray-300 [&_th]:border-1 [&_th]:border-gray-300">
            <thead>
              <tr>
                <th></th>
                <th className="w-14">Đúng</th>
                <th className="w-14">Sai</th>
              </tr>
            </thead>
            <tbody>
              {optionsList.map((item) => (
                <tr key={item.key}>
                  <td className="p-2">
                    <Markdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {item.body}
                    </Markdown>
                  </td>
                  <td>
                    <label
                      className={
                        "block relative cursor-pointer select-none min-h-14 pl-14 py-2 content-center [&:hover>span]:bg-gray-500 rounded-xl"
                      }
                    >
                      <input
                        id={
                          "opt-true-ans" +
                          problemIndex.toString() +
                          item.key.toString()
                        }
                        type="radio"
                        name={
                          "true false ans" +
                          problemIndex.toString() +
                          item.key.toString()
                        }
                        className="absolute opacity-0 cursor-pointer [&:checked+span]:!bg-blue-500"
                        checked={answer[item.key] == "1"}
                        disabled={answer[item.key] == "0"}
                        readOnly
                      />
                      <span className="absolute top-2/4 -translate-y-1/2 left-2 w-10 h-10 bg-gray-200 rounded-full"></span>
                    </label>
                  </td>
                  <td>
                    <label
                      className={
                        "block relative cursor-pointer select-none min-h-14 pl-14 py-2 content-center [&:hover>span]:bg-gray-500 rounded-xl"
                      }
                    >
                      <input
                        id={
                          "opt-false-ans" +
                          problemIndex.toString() +
                          item.key.toString()
                        }
                        type="radio"
                        name={
                          "true false ans" +
                          problemIndex.toString() +
                          item.key.toString()
                        }
                        className="absolute opacity-0 cursor-pointer [&:checked+span]:!bg-blue-500"
                        checked={answer[item.key] == "0"}
                        disabled={answer[item.key] == "1"}
                        readOnly
                      />
                      <span className="absolute top-2/4 -translate-y-1/2 left-2 w-10 h-10 bg-gray-200 rounded-full"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
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
