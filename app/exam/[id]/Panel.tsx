"use client";

import { Button } from "@heroui/button";
import { useEffect } from "react";

export default function Panel({
  id,
  mathStatus,
  readingStatus,
  scientificStatus,
  rawData,
}: {
  id: string;
  mathStatus: boolean;
  readingStatus: boolean;
  scientificStatus: boolean;
  rawData: string;
}) {
  useEffect(() => {
    if (!rawData) rawData = sessionStorage.getItem("rawData") || "";

    const mathButton = document.getElementById("go-math");
    if (mathButton) {
      mathButton.addEventListener("click", (e) => {
        sessionStorage.setItem("rawData", rawData);
        sessionStorage.setItem("currentId", id);
        window.location.href = "/exam/" + id + "/math";
      });
    }

    const readingButton = document.getElementById("go-reading");
    if (readingButton) {
      readingButton.addEventListener("click", (e) => {
        sessionStorage.setItem("rawData", rawData);
        sessionStorage.setItem("currentId", id);
        window.location.href = "/exam/" + id + "/reading";
      });
    }

    const scientificButton = document.getElementById("go-scientific");
    if (scientificButton) {
      scientificButton.addEventListener("click", (e) => {
        sessionStorage.setItem("rawData", rawData);
        sessionStorage.setItem("currentId", id);
        window.location.href = "/exam/" + id + "/scientific";
      });
    }
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center bg-blue-50">
      <div className="flex flex-col items-center p-12 rounded-lg bg-white shadow text-lg [&>*]:w-full mx-4">
        <div className="border-1 border-gray-200 flex p-4 items-center">
          <div className="flex flex-col mr-4">
            <span>1. Phần thi Tư duy Toán học</span>
            <span>
              Trạng thái:{" "}
              {mathStatus ? (
                <span className="text-gray-500">Đã thi</span>
              ) : (
                <span className="text-green-500">Chưa thi</span>
              )}
            </span>
          </div>
          <div className="ml-auto">
            <Button
              id="go-math"
              color={mathStatus ? "default" : "danger"}
              variant="shadow"
              isDisabled={mathStatus}
            >
              Vào thi
            </Button>
          </div>
        </div>
        <div className="border-1 border-gray-200 flex p-4 items-center">
          <div className="flex flex-col mr-4">
            <span>2. Phần thi Tư duy Đọc hiểu</span>
            <span>
              Trạng thái:{" "}
              {readingStatus ? (
                <span className="text-gray-500">Đã thi</span>
              ) : (
                <span className="text-green-500">Chưa thi</span>
              )}
            </span>
          </div>
          <div className="ml-auto">
            <Button
              id="go-reading"
              color={!mathStatus || readingStatus ? "default" : "danger"}
              variant="shadow"
              isDisabled={!mathStatus || readingStatus}
            >
              Vào thi
            </Button>
          </div>
        </div>
        <div className="border-1 border-gray-200 flex p-4 items-center">
          <div className="flex flex-col mr-4">
            <span>3. Phần thi Tư duy Khoa học</span>
            <span>
              Trạng thái:{" "}
              {scientificStatus ? (
                <span className="text-gray-500">Đã thi</span>
              ) : (
                <span className="text-green-500">Chưa thi</span>
              )}
            </span>
          </div>
          <div className="ml-auto">
            <Button
              id="go-scientific"
              color={
                !mathStatus || !readingStatus || scientificStatus
                  ? "default"
                  : "danger"
              }
              variant="shadow"
              isDisabled={!mathStatus || !readingStatus || scientificStatus}
            >
              Vào thi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
