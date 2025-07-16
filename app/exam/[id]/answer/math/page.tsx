"use client";

import { useEffect, useState } from "react";
import MathView from "../view/MathView";

export default function Math() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("rawData") || "{}");
    // Use the data
    // sessionStorage.removeItem("redirectData"); // Clean up

    setData(data.math);
  }, []);

  return data ? <MathView rawProblemSet={data} /> : <>Not found</>;
}
