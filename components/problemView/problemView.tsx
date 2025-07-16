import { Button } from "@heroui/button";
import { Bookmark } from "lucide-react";

import ChooseTheBest from "./chooseTheBest";
import ChooseMultiple from "./chooseMultiple";
import TrueFalse from "./trueFalse";
import DragDrop from "./dragDrop";
import Fill from "./fill";

import { useEffect } from "react";

export default function ProblemView({
  type,
  problemIndex,
  statement,
  optionsList,
  showAnswer,
  answer,
  usrAnswer,
}: {
  type: string;
  problemIndex: number;
  statement: string;
  optionsList: Array<{ key: number; body: string }>;
  showAnswer: boolean;
  answer: string;
  usrAnswer: string;
}) {
  useEffect(() => {
    const bookmarkButton = document.getElementById(
      "bookmark-button" + problemIndex.toString(),
    );
    if (bookmarkButton) {
      bookmarkButton.addEventListener("click", (e) => {
        const statusNode = document.getElementById(
          "status-node" + problemIndex.toString(),
        );
        if (!statusNode) return;

        if (statusNode.classList.contains("border-orange-500")) {
          statusNode.classList.remove("border-2", "border-orange-500");

          const numberMarked = document.getElementById("number-marked");
          if (numberMarked)
            numberMarked.innerText = (
              Number(numberMarked.innerText) - 1
            ).toString();
        } else {
          statusNode.classList.add("border-2", "border-orange-500");

          const numberMarked = document.getElementById("number-marked");
          if (numberMarked)
            numberMarked.innerText = (
              Number(numberMarked.innerText) + 1
            ).toString();
        }
      });
    }
  }, []);

  const renderProblem = () => {
    switch (type) {
      case "chooseTheBest":
        return (
          <ChooseTheBest
            problemIndex={problemIndex}
            statement={statement}
            optionsList={optionsList}
            showAnswer={showAnswer}
            answer={answer}
            usrAnswer={usrAnswer}
          />
        );
        break;
      case "chooseMultiple":
        return (
          <ChooseMultiple
            problemIndex={problemIndex}
            statement={statement}
            optionsList={optionsList}
            showAnswer={showAnswer}
            answer={answer}
            usrAnswer={usrAnswer}
          />
        );
        break;
      case "trueFalse":
        return (
          <TrueFalse
            problemIndex={problemIndex}
            statement={statement}
            optionsList={optionsList}
            showAnswer={showAnswer}
            answer={answer}
            usrAnswer={usrAnswer}
          />
        );
        break;
      case "dragDrop":
        return (
          <DragDrop
            problemIndex={problemIndex}
            statement={statement}
            optionsList={optionsList}
            showAnswer={showAnswer}
            answer={answer}
            usrAnswer={usrAnswer}
          />
        );
        break;
      case "fill":
        return (
          <Fill
            problemIndex={problemIndex}
            statement={statement}
            showAnswer={showAnswer}
            answer={answer}
            usrAnswer={usrAnswer}
          />
        );
        break;
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <span className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center">
          {problemIndex + 1}
        </span>
        {/* {usrAnswer} {answer} */}
        {renderProblem()}
        <Button
          id={"bookmark-button" + problemIndex.toString()}
          className="ml-auto rounded-full bg-gray-100"
          isIconOnly
        >
          <Bookmark />
        </Button>
        <div id={"user-answer" + problemIndex.toString()}></div>
      </div>
    </>
  );
}
