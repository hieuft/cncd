"use client";

import PointView from "@/components/pointView";
import { trim } from "@/utils/convert";
import { isAccept } from "@/utils/stringRegex";
import { Button } from "@heroui/button";
import { useEffect, useState } from "react";

export default function Point({ id }: { id: string }) {
  const [mathPoint, setMathPoint] = useState(0);
  const [readingPoint, setReadingPoint] = useState(0);
  const [scientificPoint, setScientificPoint] = useState(0);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("rawData") || "{}");

    function getMathPoint() {
      const userMathAnswer =
        sessionStorage.getItem("userMathAnswer")?.split("[divider]") || [];
      // console.log(userMathAnswer);

      let mathAnswer = [];
      for (let i = 0, n = data.math.length; i < n; ++i) {
        mathAnswer.push(data.math[i].answer);
      }
      // console.log(mathAnswer);

      let ret = 0;
      for (let i = 0, n = mathAnswer.length; i < n; ++i) {
        if (
          trim(userMathAnswer[i].toLowerCase()) ==
          trim(mathAnswer[i].toLowerCase())
        ) {
          ++ret;
        }
      }

      return ret;
    }

    function getReadingPoint() {
      const userReadingAnswer =
        sessionStorage.getItem("userReadingAnswer")?.split("[divider]") || [];

      let readingAnswer = [];
      for (let i = 0, n = data.reading.length; i < n; ++i) {
        for (let j = 0, m = data.reading[i].questions.length; j < m; ++j) {
          readingAnswer.push(data.reading[i].questions[j].answer);
        }
      }

      let ret = 0;
      for (let i = 0, n = readingAnswer.length; i < n; ++i) {
        // console.log(i, readingAnswer[i], userReadingAnswer[i]);
        if (readingAnswer[i].includes("|")) {
          const x = userReadingAnswer[i].split("|");
          const y = readingAnswer[i].split("|");

          let ok = true;
          for (let j = 0; j < y.length; ++j) {
            if (!isAccept(y[j], x[j])) {
              ok = false;
              break;
            }
          }

          if (ok) {
            ++ret;
            // console.log(1, i);
          }
        } else {
          if (isAccept(readingAnswer[i], userReadingAnswer[i])) {
            ++ret;
            // console.log(3, i);
          }
        }
      }

      return ret;
    }

    function getScientificPoint() {
      const userScientificAnswer =
        sessionStorage.getItem("userScientificAnswer")?.split("[divider]") ||
        [];

      let scientificAnswer = [];
      for (let i = 0, n = data.scientific.length; i < n; ++i) {
        for (let j = 0, m = data.scientific[i].questions.length; j < m; ++j) {
          scientificAnswer.push(data.scientific[i].questions[j].answer);
        }
      }

      let ret = 0;
      for (let i = 0, n = scientificAnswer.length; i < n; ++i) {
        // console.log(i, scientificAnswer[i], userScientificAnswer[i]);
        if (scientificAnswer[i].includes("|")) {
          const x = userScientificAnswer[i].split("|");
          const y = scientificAnswer[i].split("|");

          let ok = true;
          for (let j = 0; j < y.length; ++j) {
            if (!isAccept(y[j], x[j])) {
              ok = false;
              break;
            }
          }

          if (ok) {
            ++ret;
            // console.log("_1", i);
          }
        } else {
          if (isAccept(scientificAnswer[i], userScientificAnswer[i])) {
            ++ret;
            // console.log("_2", i);
          }
        }
      }

      return ret;
    }

    function addTextToElement(id: string, content: string) {
      const element = document.getElementById(id);
      if (element) element.innerText = content;
    }

    function displayPoint(math: number, reading: number, scientific: number) {
      // console.log(math, reading, scientific);
      addTextToElement("total-point", (math + reading + scientific).toString());
      addTextToElement("math-point", math.toString());
      addTextToElement("reading-point", reading.toString());
      addTextToElement("scientific-point", scientific.toString());
    }

    // console.log(data.math);
    setMathPoint(getMathPoint());
    // console.log(mathPoint);

    setReadingPoint(getReadingPoint());
    // console.log("Point", readingPoint);

    setScientificPoint(getScientificPoint());
    // console.log(scientificPoint);
    displayPoint(mathPoint, readingPoint, scientificPoint);
  }, []);

  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center overflow-auto">
        <div className="flex flex-col items-center justify-center">
          <PointView
            math={mathPoint}
            reading={readingPoint}
            scientific={scientificPoint}
          />

          <div className="mt-4 flex flex-col w-full gap-4">
            <div className="w-full">
              <a href={"/exam/" + id + "/answer/math"} className="w-full">
                <Button
                  className="w-full"
                  color="primary"
                  size="lg"
                  variant="shadow"
                >
                  Xem đáp án Tư duy Toán học
                </Button>
              </a>
            </div>
            <div className="w-full">
              <a href={"/exam/" + id + "/answer/reading"} className="w-full">
                <Button
                  className="w-full"
                  color="primary"
                  size="lg"
                  variant="shadow"
                >
                  Xem đáp án Tư duy Đọc hiểu
                </Button>
              </a>
            </div>
            <div className="w-full">
              <a href={"/exam/" + id + "/answer/scientific"} className="w-full">
                <Button
                  className="w-full"
                  color="primary"
                  size="lg"
                  variant="shadow"
                >
                  Xem đáp án Tư duy Khoa học
                </Button>
              </a>
            </div>
            <div className="w-full">
              <a href="/" className="w-full">
                <Button
                  className="w-full"
                  color="default"
                  size="lg"
                  variant="shadow"
                >
                  Về trang chủ
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
