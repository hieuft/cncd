"use client";

import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CircularProgress, Progress } from "@heroui/progress";

import { useEffect, useState } from "react";

import ProblemView from "@/components/problemView/problemView";

import { arrayToArrayWithKey } from "@/utils/convert";
import { secondToMinuteAndSecond } from "@/utils/timeFormat";

export default function MathView({
  rawProblemSet,
  timeLimit,
}: {
  rawProblemSet: Array<Object>;
  timeLimit: number;
}) {
  const numberOfProblems = rawProblemSet.length;

  const problemsSet = formatProblemSet(rawProblemSet);

  const [numberOfSolvedProblems, setNumberOfSolvedProblems] = useState(0);

  function formatProblemSet(raw: Array<any>) {
    let ret: Array<any> = [];

    for (let i = 0; i < numberOfProblems; ++i) {
      ret.push({
        ...raw[i],
        key: i,
        options: arrayToArrayWithKey(raw[i].options),
      });
    }

    return ret;
  }

  useEffect(() => {
    function displayFirstProblem() {
      document
        .getElementById("status-node0")
        ?.classList.add("!bg-gray-400", "!text-black");
      document.getElementById("problem0")?.classList.remove("hidden");
    }

    function moveToIthProblem(i: number) {
      if (i < 0 || i >= numberOfProblems) return;

      const problemList = document.getElementById("problem-list");
      const lastIndex = problemList?.getAttribute("data-index") || 0;

      // remove old node selection
      document
        .getElementById("status-node" + lastIndex.toString())
        ?.classList.remove("!bg-gray-400", "!text-black");
      // move selection to new node
      document
        .getElementById("status-node" + i.toString())
        ?.classList.add("!bg-gray-400", "!text-black");

      // hide old problem
      document
        .getElementById("problem" + lastIndex.toString())
        ?.classList.add("hidden");
      // display new problem
      document
        .getElementById("problem" + i.toString())
        ?.classList.remove("hidden");

      problemList?.setAttribute("data-index", i.toString());

      // display new time count up
      const timeBox = document.getElementById("current-time-box");
      const currentProblem = document.getElementById("problem" + i.toString());
      if (timeBox && currentProblem) {
        const currentProblemTime = Number(
          currentProblem.getAttribute("data-time"),
        );
        timeBox.innerHTML = secondToMinuteAndSecond(currentProblemTime);
      }
    }

    function listenStatusNodeClickEvent() {
      for (let i = 0; ; ++i) {
        const statusNode = document.getElementById(
          "status-node" + i.toString(),
        );

        if (!statusNode) break;

        statusNode.addEventListener("click", () => {
          moveToIthProblem(i);
        });
      }
    }

    function prevAndNextProblemButton() {
      document
        .getElementById("prev-problem")
        ?.addEventListener("click", (e) => {
          const currentIndex = Number(
            document.getElementById("problem-list")?.getAttribute("data-index"),
          );
          moveToIthProblem(currentIndex - 1);
        });
      document
        .getElementById("next-problem")
        ?.addEventListener("click", (e) => {
          const currentIndex = Number(
            document.getElementById("problem-list")?.getAttribute("data-index"),
          );
          moveToIthProblem(currentIndex + 1);
        });
    }

    function listenNumberSolvedChange() {
      const numberSolved = document.getElementById("number-solved");

      if (numberSolved) {
        numberSolved.addEventListener("textchanged", (e) => {
          setNumberOfSolvedProblems(Number(numberSolved.innerText));
        });
      }
    }

    function handleSubmit() {
      document.getElementById("loading-overlay")?.classList.remove("hidden");

      let userAnswers = [];
      for (let i = 0; ; ++i) {
        const userAnswer = document.getElementById(
          "user-answer" + i.toString(),
        );
        if (!userAnswer) break;
        userAnswers.push(userAnswer.innerText.toLowerCase().replace(/\s/g, ""));
      }

      const id = sessionStorage.getItem("currentId") || "";

      sessionStorage.setItem("userMathAnswer", userAnswers.join("[divider]"));

      setTimeout(function () {
        window.location.href = "/exam/" + id + "?math=done";
      }, 4000);
    }

    function listenSubmitButton() {
      const submit = document.getElementById("submit");
      if (submit) {
        submit.addEventListener("click", (e) => {
          e.preventDefault();
          if (confirm("Bạn có muốn nộp bài không?")) {
            submit.disabled = true;
            handleSubmit();
          }
        });
      }
    }

    function timeRunner() {
      const clock = setInterval(() => {
        const problemList = document.getElementById("problem-list");
        const currentTimeBox = document.getElementById("current-time-box");
        const timeBox = document.getElementById("time-box");
        if (problemList && currentTimeBox && timeBox) {
          const currentIndex = Number(problemList.getAttribute("data-index"));
          const currentProblem = document.getElementById(
            "problem" + currentIndex.toString(),
          );

          if (currentProblem) {
            const currentProblemTime = Number(
              currentProblem.getAttribute("data-time"),
            );
            currentTimeBox.innerText = secondToMinuteAndSecond(
              currentProblemTime + 1,
            );
            currentProblem.setAttribute(
              "data-time",
              (currentProblemTime + 1).toString(),
            );
          }

          const currentTime = Number(timeBox.getAttribute("data-time"));
          timeBox.innerText = secondToMinuteAndSecond(currentTime - 1);
          timeBox.setAttribute("data-time", (currentTime - 1).toString());

          if (currentTime - 1 == 0) {
            const submit = document.getElementById("submit");
            if (submit) {
              handleSubmit();
              clearInterval(clock);
            }
          }
        }
      }, 1000);
    }

    if (typeof window !== "undefined" && rawProblemSet.length) {
      displayFirstProblem();
      listenStatusNodeClickEvent();
      listenNumberSolvedChange();
      prevAndNextProblemButton();
      listenSubmitButton();
      timeRunner();
    }
  }, [rawProblemSet]);

  return (
    <>
      <div id="loading-overlay" className="hidden">
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-50 z-40"></div>
        <CircularProgress
          className="p-4 bg-white fixed max-w-max max-h-max mx-auto my-auto inset-x-0 inset-y-0 z-50 rounded-lg"
          aria-label="Loading..."
          size="lg"
        />
      </div>

      <div className="grid grid-cols-3 h-full pb-20">
        <div
          className="col-span-2 p-8 overflow-y-auto"
          id="problem-list"
          data-index={0}
        >
          {problemsSet.map((item: any) => (
            <div
              key={item.key}
              id={"problem" + item.key.toString()}
              className="hidden"
              data-time={0}
            >
              <ProblemView
                type={item.type}
                problemIndex={item.key}
                statement={item.statement}
                optionsList={item.options}
                showAnswer={false}
                answer={""}
                usrAnswer={""}
              />
            </div>
          ))}
        </div>

        <div className="col-span-1 p-4 flex flex-col">
          <div className="overflow-auto">
            <div className="text-lg font-bold">Thông tin</div>
            <div className="flex items-center gap-4 my-4">Tư duy Toán học</div>
            <div className="flex items-center gap-3 my-4">
              <span className="mr-auto text-medium">Thời gian còn lại</span>
              <span
                id="time-box"
                className="text-3xl font-bold"
                data-time={timeLimit}
              >
                {secondToMinuteAndSecond(timeLimit)}
              </span>
              <Button
                id="submit"
                className="text-medium"
                color="danger"
                variant="flat"
                size="lg"
              >
                Nộp bài
              </Button>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-lg font-bold flex items-center gap-4">
              <span>Chỉ thị màu sắc:</span>
              <span
                id="number-not-solve"
                className="rounded-full flex justify-center items-center w-10 h-10 bg-gray-100 text-black"
              >
                {numberOfProblems}
              </span>
              <span
                id="number-solved"
                className="rounded-full flex justify-center items-center w-10 h-10 bg-blue-500 text-white"
              >
                0
              </span>
              <span
                id="number-marked"
                className="rounded-full flex justify-center items-center w-10 h-10 border-2 border-orange-500"
              >
                0
              </span>
            </div>
            <div className="my-4">
              <ul className="flex flex-wrap gap-4 [&_*]:rounded-full [&_*]:flex [&_*]:justify-center [&_*]:items-center [&_*]:w-10 [&_*]:h-10 [&_*]:cursor-pointer">
                {problemsSet.map((item) => (
                  <li
                    key={item.key}
                    id={"status-node" + item.key.toString()}
                    className={"bg-gray-200 text-black"}
                  >
                    {item.key + 1}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto border-t-1 border-gray-200 text-lg font-bold">
            <div className="flex items-center my-4">
              <span className="">Bạn đã hoàn thành</span>
              <span className="ml-auto mr-2 text-3xl">
                <span>{numberOfSolvedProblems}</span>/
                <span>{numberOfProblems}</span>
              </span>
              <span>câu</span>
            </div>
            <div id="progress-bar" className="flex items-center leading-3">
              <Progress
                aria-label="progress bar"
                className="max-w"
                value={Math.round(
                  (100 * numberOfSolvedProblems) / numberOfProblems,
                )}
              />
              <span className="ml-4">
                {Math.round((100 * numberOfSolvedProblems) / numberOfProblems)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-center fixed bottom-0 px-4 h-20 bg-white w-full text-lg font-bold">
        <Button isIconOnly size="lg" id="prev-problem">
          <ChevronLeft />
        </Button>
        <Button
          id="next-problem"
          className="text-medium"
          color="primary"
          variant="flat"
          size="lg"
          endContent={<ChevronRight className="-mr-[6px]" />}
        >
          Câu tiếp
        </Button>
        <div className="flex gap-4 items-center justify-center">
          <span>Thời gian làm câu hiện tại:</span>
          <span id="current-time-box" className="text-3xl font-bold">
            00:00
          </span>
        </div>
      </div>
    </>
  );
}
