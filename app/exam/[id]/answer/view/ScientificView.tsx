"use client";

import { Button, Tooltip } from "@heroui/react";

import { ChevronLeft, ChevronRight, CircleX } from "lucide-react";
import { CircularProgress, Progress } from "@heroui/progress";

import { useEffect, useState } from "react";

import ProblemView from "@/components/problemView/problemView";

import { arrayToArrayWithKey } from "@/utils/convert";
import { usePathname } from "next/navigation";

export default function ScientificView({
  rawProblemSet,
}: {
  rawProblemSet: Array<Object>;
}) {
  const numberOfLargeProblems = rawProblemSet.length;
  let numberOfProblems = 0;

  let spreadedProblemSet: any[] = [];
  const problemsSet = formatProblemSet(rawProblemSet);

  const [numberOfSolvedProblems, setNumberOfSolvedProblems] = useState(0);

  const [openDrawer, setOpenDrawer] = useState(false);

  const pathname = usePathname();

  const [userAnswer, setUserAnswer] = useState([""]);

  function formatQuestionsList(x: number, raw: Array<any>) {
    let ret: Array<any> = [];

    for (let i = 0; i < raw.length; ++i) {
      ret.push({
        ...raw[i],
        key: numberOfProblems + i,
        x: x,
        y: i,
        options: arrayToArrayWithKey(raw[i].options),
      });
      spreadedProblemSet.push({
        ...raw[i],
        key: numberOfProblems + i,
        x: x,
        y: i,
        options: arrayToArrayWithKey(raw[i].options),
      });
    }
    numberOfProblems += raw.length;

    return ret;
  }

  function formatProblemSet(raw: Array<any>) {
    let ret: Array<any> = [];

    for (let i = 0; i < numberOfLargeProblems; ++i) {
      ret.push({
        ...raw[i],
        key: i,
        questions: formatQuestionsList(i, raw[i].questions),
      });
    }

    return ret;
  }

  useEffect(() => {
    function displayFirstProblem() {
      document.getElementById("problem0")?.classList.remove("hidden");
    }

    function moveToIthProblem(i: number, j: any) {
      if (i < 0 || i >= numberOfLargeProblems) return;

      const problemList = document.getElementById("problem-list");
      const lastIndex = problemList?.getAttribute("data-index") || 0;

      // hide old problem
      document
        .getElementById("problem" + lastIndex.toString())
        ?.classList.add("hidden");
      // display new problem
      document
        .getElementById("problem" + i.toString())
        ?.classList.remove("hidden");

      problemList?.setAttribute("data-index", i.toString());

      if (j) {
        document
          .getElementById("problem" + i.toString() + j.toString())
          ?.scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    }

    function listenStatusNodeClickEvent() {
      for (let i = 0; ; ++i) {
        const statusNode = document.getElementById(
          "status-node" + i.toString(),
        );

        if (!statusNode) break;

        statusNode.addEventListener("click", () => {
          moveToIthProblem(
            Number(statusNode.getAttribute("data-index-x")),
            Number(statusNode.getAttribute("data-index-y")),
          );
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
          moveToIthProblem(currentIndex - 1, null);
        });
      document
        .getElementById("next-problem")
        ?.addEventListener("click", (e) => {
          const currentIndex = Number(
            document.getElementById("problem-list")?.getAttribute("data-index"),
          );
          moveToIthProblem(currentIndex + 1, null);
        });
    }

    function listenSubmitButton() {
      const submit = document.getElementById("submit");
      if (submit) {
        submit.addEventListener("click", (e) => {
          e.preventDefault();
          if (confirm("Bạn có muốn quay lại không?")) {
            submit.disabled = true;
            document
              .getElementById("loading-overlay")
              ?.classList.remove("hidden");

            let userAnswers = [];
            for (let i = 0; ; ++i) {
              const userAnswer = document.getElementById(
                "user-answer" + i.toString(),
              );
              if (!userAnswer) break;
              userAnswers.push(
                userAnswer.innerText.toLowerCase().replace(/\s+/g, " ").trim(),
              );
            }

            const id = sessionStorage.getItem("currentId") || "";

            setTimeout(function () {
              window.location.href =
                "/exam/" + id + "?math=done&reading=done&scientific=done";
            }, 4000);
          }
        });
      }
    }

    function getUserAnswer() {
      if (pathname.includes("reading")) {
        const userMathAnswer =
          sessionStorage.getItem("userReadingAnswer")?.split("[divider]") || [];
        setUserAnswer(userMathAnswer);
      } else {
        const userMathAnswer =
          sessionStorage.getItem("userScientificAnswer")?.split("[divider]") ||
          [];
        setUserAnswer(userMathAnswer);
      }
    }

    if (typeof window !== "undefined" && rawProblemSet.length) {
      displayFirstProblem();
      listenStatusNodeClickEvent();
      prevAndNextProblemButton();
      listenSubmitButton();
      getUserAnswer();
    }
  }, [rawProblemSet]);

  function renderQuestions(arr: any) {
    return (
      <>
        {arr.map((item: any) => (
          <div
            key={item.key}
            id={"problem" + item.x.toString() + item.y.toString()}
            className="mb-20"
          >
            <ProblemView
              type={item.type}
              problemIndex={item.key}
              statement={item.statement}
              optionsList={item.options}
              showAnswer={true}
              answer={item.answer}
              usrAnswer={userAnswer[item.key]}
            />
          </div>
        ))}
      </>
    );
  }

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

      <div id="problem-list" data-index={0}>
        {problemsSet.map((item: any) => (
          <div
            key={item.key}
            id={"problem" + item.key.toString()}
            className="hidden h-screen"
          >
            <div className="grid grid-cols-2 h-full pb-20">
              <div className="col-span-1 p-8 overflow-y-auto h-full">
                {item.body}
              </div>

              <div className="flex flex-col col-span-1 p-4 pb-20 overflow-y-auto h-full">
                {renderQuestions(item.questions)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 items-center fixed bottom-0 px-4 h-20 bg-white w-full font-bold text-medium z-10">
        <Button isIconOnly size="lg" id="prev-problem">
          <ChevronLeft />
        </Button>

        <Button
          id="next-problem"
          className="text-medium mr-auto"
          color="primary"
          variant="flat"
          size="lg"
          endContent={<ChevronRight className="-mr-[6px]" />}
        >
          Câu tiếp
        </Button>

        <Tooltip content="Mở bảng trạng thái" showArrow={true}>
          <Button
            onPress={(e) => {
              setOpenDrawer(true);
            }}
            className=""
            color="danger"
            variant="flat"
            size="lg"
            startContent={<ChevronLeft className="-ml-[6px]" />}
          >
            Mở menu / Quay lại
          </Button>
        </Tooltip>
      </div>

      <div
        id="drawer"
        className={
          "grid grid-cols-3 fixed right-0 top-0 bottom-0 left-0 z-20" +
          (openDrawer ? " is-open" : "")
        }
      >
        <div
          id="drawer-blank-space"
          className="col-span-2"
          onClick={(e) => {
            setOpenDrawer(false);
          }}
        ></div>
        <div className="relative col-span-1">
          <div
            id="drawer-content"
            className="absolute w-full h-full p-4 flex flex-col bg-white"
          >
            <div className="mb-4 text-right">
              <Button
                id="drawer-close-button"
                isIconOnly
                className="rounded-full"
                onPress={(e) => {
                  setOpenDrawer(false);
                }}
              >
                <CircleX />
              </Button>
            </div>
            <div>
              <div className="flex items-center gap-3 my-4">
                <div className="mr-auto">
                  {pathname.includes("reading")
                    ? "Đáp án Tư duy Đọc hiểu"
                    : "Đáp án Tư duy Khoa học"}
                </div>
                <Button
                  id="submit"
                  className="text-medium"
                  color="danger"
                  variant="flat"
                  size="lg"
                >
                  Quay lại
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
                  {spreadedProblemSet.map((item) => (
                    <li
                      key={item.key}
                      id={"status-node" + item.key.toString()}
                      className={"bg-gray-200 text-black"}
                      data-index-x={item.x}
                      data-index-y={item.y}
                      onClick={(e) => {
                        setOpenDrawer(false);
                      }}
                    >
                      {item.key + 1}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
