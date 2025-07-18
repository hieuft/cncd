import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { useEffect } from "react";

import { Fillbox } from "@/components/fillbox";

import { renderToString } from "react-dom/server";

export default function Fill({
  problemIndex,
  statement,
  showAnswer,
  answer,
  usrAnswer,
}: {
  problemIndex: number;
  statement: string;
  showAnswer: boolean;
  answer: string;
  usrAnswer: string;
}) {
  useEffect(() => {
    function initUserAnswer() {
      const regex = new RegExp("___", "g");
      const matches = statement.match(regex) || [];
      const arr = Array(matches.length);

      const userAnswer = document.getElementById(
        "user-answer" + problemIndex.toString(),
      );
      if (userAnswer) userAnswer.innerText = arr.join("|");
    }

    function updateUserAnswer(boxIndex: number, value: string) {
      const userAnswer = document.getElementById(
        "user-answer" + problemIndex.toString(),
      );
      if (userAnswer) {
        let arr = userAnswer.innerText.split("|");
        arr[boxIndex] = value;
        userAnswer.innerText = arr.join("|");
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
        if (!userAnswer) return 0;

        const arr = userAnswer.innerText.split("|");
        let done = false;
        for (let i = 0; i < arr.length; ++i) {
          if (arr[i]) {
            done = true;
            break;
          }
        }

        if (done && !statusNode.classList.contains("bg-blue-500")) {
          statusNode.classList.remove("bg-gray-200", "text-black");
          statusNode.classList.add("bg-blue-500", "text-white");
          return 1;
        } else if (!done && statusNode.classList.contains("bg-blue-500")) {
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

    function listenFillEvent(i: number) {
      const fillBox = document.getElementById(
        "fillbox" + problemIndex.toString() + i.toString(),
      );
      if (!fillBox) return false;

      fillBox.addEventListener("input", (e) => {
        updateUserAnswer(
          Number(e.target?.getAttribute("data-index")),
          e.target.value,
        );
        updateNumberProblemStatus(changeStatusNode());
      });
      return true;
    }

    if (typeof window != undefined) {
      if (!showAnswer) {
        initUserAnswer();
        for (let i = 0; ; ++i) {
          if (!listenFillEvent(i)) break;
        }
      } else {
        if (answer && usrAnswer) {
          const x = answer.split("|");
          for (let i = 0; i < x.length; ++i) {
            const box = document.getElementById(
              "fillbox-ans" + problemIndex.toString() + i.toString(),
            );
            if (box) {
              box.disabled = true;
              box.value = x[i].split("[]").join(" / ");
            }
          }

          const y = usrAnswer.split("|");
          for (let i = 0; i < y.length; ++i) {
            const box = document.getElementById(
              "fillbox-usr" + problemIndex.toString() + i.toString(),
            );
            if (box) {
              box.disabled = true;
              if (x[i].split("[]").includes(y[i])) {
                box.classList.add("text-green-500");
              } else {
                box.classList.add("text-red-500");
              }
              box.value = y[i];
            }
          }

          const statusNode = document.getElementById(
            "status-node" + problemIndex.toString(),
          );
          if (statusNode) {
            const x = answer.split("|");
            const y = usrAnswer.split("|");
            let ok = true;

            for (let i = 0; i < x.length; ++i) {
              if (!x[i].split("[]").includes(y[i])) {
                ok = false;
                break;
              }
            }

            if (ok) {
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

  function formatTopic(topic: string, padding: string) {
    let numberOfPlaceholder = 0;
    for (let i = 0; i + 2 < topic.length; ++i) {
      if (topic[i] + topic[i + 1] + topic[i + 2] == "___") {
        topic = `${topic.slice(0, i)} ${renderToString(<Fillbox idName={"fillbox" + padding + problemIndex.toString() + numberOfPlaceholder.toString()} index={numberOfPlaceholder} />)} ${topic.slice(i + 3)}`;
        numberOfPlaceholder++;
      }
    }
    return topic;
  }

  if (!showAnswer) {
    return (
      <div className="flex text-lg flex-1 flex-col">
        <div className="mb-4">
          <Markdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
          >
            {formatTopic(statement, "")}
          </Markdown>
        </div>

        <div></div>
      </div>
    );
  } else {
    return (
      <div className="flex text-lg flex-1 flex-col">
        <div className="mb-4">
          <div>
            <span>Câu trả lời của bạn:</span>
            <Markdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
            >
              {formatTopic(statement, "-usr")}
            </Markdown>
          </div>
          <br />
          <div>
            <span>Đáp án:</span>
            <Markdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
            >
              {formatTopic(statement, "-ans")}
            </Markdown>
          </div>
        </div>

        <div></div>
      </div>
    );
  }
}
