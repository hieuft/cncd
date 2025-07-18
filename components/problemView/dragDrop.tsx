"use client";

import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";
import { useEffect } from "react";

import { Dropbox } from "@/components/dropbox";

import { renderToString } from "react-dom/server";
import { normalize } from "node:path/posix";

export default function DragDrop({
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
      const regex = new RegExp("___", "g");
      const matches = statement.match(regex) || [];
      const arr = Array(matches.length);

      const userAnswer = document.getElementById(
        "user-answer" + problemIndex.toString(),
      );
      if (userAnswer) userAnswer.innerText = arr.join("|");

      const optionsBox = document.getElementById(
        "dropbox" + problemIndex.toString(),
      );
      if (optionsBox) optionsBox.id += matches.length.toString();
    }

    function updateUserAnswer(src: any, opt: any, box: any) {
      const userAnswer = document.getElementById(
        "user-answer" + problemIndex.toString(),
      );
      if (!userAnswer) return;

      let arr = userAnswer.innerText.split("|");
      if (src == -1) {
        if (box != -1) {
          arr[box] = opt;
        }
      } else {
        if (box == -1) {
          arr[src] = "";
        } else {
          arr[src] = "";
          arr[box] = opt;
        }
      }

      userAnswer.innerText = arr.join("|");
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

    function listenDragOptEvent(i: number) {
      const opt = document.getElementById(
        "opt" + problemIndex.toString() + i.toString(),
      );
      if (opt) {
        opt.addEventListener("dragstart", (e) => {
          const dragPreview = document.createElement("div");
          dragPreview.id = "drag-preview";
          dragPreview.innerHTML = opt.innerHTML || "<p></p>";
          dragPreview.classList.add(
            "inline-block",
            "min-w-24",
            "min-h-12",
            "content-center",
            "text-center",
            "cursor-pointer",
            "select-none",
            "bg-gray-300",
            "rounded-xl",
          );

          // Append it to the DOM (but hide it)
          dragPreview.style.position = "absolute";
          dragPreview.style.left = "-9999px";
          document.body.appendChild(dragPreview);

          const rec = dragPreview.getBoundingClientRect();

          // Set it as the drag image
          e.dataTransfer?.setDragImage(
            dragPreview,
            rec.width / 2,
            rec.height / 2,
          );

          // Clean up later
          setTimeout(() => document.body.removeChild(dragPreview), 0);

          e.dataTransfer?.setData("text", e.target?.id);
        });
        opt.addEventListener("dragend", (e) => {});
        return true;
      }
      return false;
    }

    function listenDropToBoxEvent(i: number) {
      const dropbox = document.getElementById(
        "dropbox" + problemIndex.toString() + i.toString(),
      );
      if (dropbox) {
        dropbox.addEventListener("dragover", (e) => {
          e.preventDefault();
        });
        dropbox.addEventListener("drop", (e) => {
          e.preventDefault();
          if (!e.target || !e.target.id.includes("dropbox")) return;
          if (
            e.target.getAttribute("data-index") != "-1" &&
            e.target.childNodes.length
          )
            return;

          const data = e.dataTransfer?.getData("text") || "";
          const opt = document.getElementById(data);
          const srcIndex = opt?.parentElement?.getAttribute("data-index");
          const optIndex = document
            .getElementById(data)
            ?.getAttribute("data-index");
          const boxIndex = e.target.getAttribute("data-index");

          e.target.appendChild(opt);

          updateUserAnswer(srcIndex, optIndex, boxIndex);
          updateNumberProblemStatus(changeStatusNode());
        });
        return true;
      }
      return false;
    }

    if (typeof window != undefined) {
      if (!showAnswer) {
        initUserAnswer();
        for (let i = 0; ; ++i) {
          if (!listenDragOptEvent(i)) break;
        }

        for (let i = 0; ; ++i) {
          if (!listenDropToBoxEvent(i)) break;
        }
      } else {
        if (answer && usrAnswer) {
          const x = answer.split("|");
          for (let i = 0; i < x.length; ++i) {
            const opt = document.getElementById(
              "opt-ans" + problemIndex.toString() + x[i],
            );
            const box = document.getElementById(
              "dropbox-ans" + problemIndex.toString() + i.toString(),
            );
            if (opt && box) {
              // opt.classList.add("!bg-green-50");
              box.appendChild(opt);
            }
          }

          const y = usrAnswer.split("|");
          for (let i = 0; i < y.length; ++i) {
            const opt = document.getElementById(
              "opt-usr" + problemIndex.toString() + y[i],
            );
            const box = document.getElementById(
              "dropbox-usr" + problemIndex.toString() + i.toString(),
            );
            if (opt && box) {
              if (x[i] == y[i]) {
                opt.classList.add("!bg-green-50");
              } else {
                opt.classList.add("!bg-red-50");
              }
              box.appendChild(opt);
            }
          }

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

  function formatTopic(topic: string, padding: string) {
    let numberOfPlaceholder = 0;
    for (let i = 0; i + 2 < topic.length; ++i) {
      if (topic[i] + topic[i + 1] + topic[i + 2] == "___") {
        topic = `${topic.slice(0, i)} ${renderToString(<Dropbox idName={"dropbox" + padding + problemIndex.toString() + numberOfPlaceholder.toString()} index={numberOfPlaceholder} />)} ${topic.slice(i + 3)}`;
        numberOfPlaceholder++;
      }
    }
    return topic;
  }

  const normalOptionsList = (padding: string) => {
    return (
      <>
        <div
          id={"dropbox" + padding + problemIndex.toString()}
          data-index="-1"
          className="flex gap-4 p-4 rounded-lg border-2 border-gray-200 min-h-20"
        >
          {optionsList.map((item) => (
            <div
              id={
                "opt" + padding + problemIndex.toString() + item.key.toString()
              }
              key={item.key}
              data-index={item.key}
              className={
                "inline-block min-w-24 min-h-12 content-center text-center cursor-pointer select-none bg-gray-100 rounded-xl"
              }
              draggable={!showAnswer}
            >
              <Markdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex, rehypeRaw]}
              >
                {item.body}
              </Markdown>
            </div>
          ))}
        </div>
      </>
    );
  };

  const optionsListWithAnswer = () => {
    return (
      <>
        {normalOptionsList("")}
        <div className="hidden">{normalOptionsList("-usr")}</div>
        <div className="hidden">{normalOptionsList("-ans")}</div>
      </>
    );
  };

  const renderOptionsList = () => {
    if (!showAnswer) return normalOptionsList("");
    return optionsListWithAnswer();
  };

  if (!showAnswer) {
    return (
      <div className="flex text-lg flex-1 flex-col-reverse">
        <div className="mb-4">
          <Markdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
          >
            {formatTopic(statement, "")}
          </Markdown>
        </div>

        <div className="mb-4">{renderOptionsList()}</div>
      </div>
    );
  } else {
    return (
      <div className="flex text-lg flex-1 flex-col-reverse">
        <div className="mb-4">
          <div>
            <span>Câu trả của bạn:</span>
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

        <div className="mb-4">{renderOptionsList()}</div>
      </div>
    );
  }
}
