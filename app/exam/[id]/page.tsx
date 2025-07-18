import { redirect } from "next/navigation";
import Panel from "./Panel";
import Point from "./Point";
import axios from "axios";
import { getCurrentHost } from "@/utils/currentHost";

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
      const host = getCurrentHost();

      const response = await axios.get(
        host + "/api/problem-set/get/" + id + "/" + email + "/",
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
