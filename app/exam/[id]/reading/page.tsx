"use client";

import { useEffect, useState } from "react";
import ScientificView from "../view/ScientificView";

export default function Math() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("rawData") || "{}");
    // Use the data
    // sessionStorage.removeItem("redirectData"); // Clean up

    setData(data.reading);
  }, []);

  return data ? (
    <ScientificView rawProblemSet={data} timeLimit={1800} />
  ) : (
    <>Not found</>
  );
}
