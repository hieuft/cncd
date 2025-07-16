import { redirect } from "next/navigation";
import Panel from "./Panel";
import Point from "./Point";
import axios from "axios";

export default async function ExamIdPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: any;
}) {
  const { id } = await params;
  const { email, math, reading, scientific } = await searchParams;
  let rawData = "";

  if (id.trim().length != 6) redirect("/exam");

  if (!math) {
    try {
      const response = await axios.get(
        "https://cncd.vercel.app/api/problem-set/get/" + id + "/" + email + "/",
      );

      rawData = response.data.rawData;
    } catch (err) {
      console.log(err);
      if (err.status == 503) {
        redirect("/exam");
      }
    }
  } else {
  }

  if (math + reading + scientific == "donedonedone") {
    return <Point id={id} />;
  } else {
    return (
      <Panel
        id={id}
        mathStatus={math == "done"}
        readingStatus={reading == "done"}
        scientificStatus={scientific == "done"}
        rawData={rawData}
      />
    );
  }
}
