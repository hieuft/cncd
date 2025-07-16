import { checkKey } from "@/config/key";
import dbConnect from "@/lib/dbConnect";
import ProblemSet from "@/models/ProblemSet";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: { params: any }) {
  try {
    await dbConnect();

    const { id, password } = await params;

    const whoDo = checkKey(password);

    if (!whoDo.length) {
      return NextResponse.json({}, { status: 501 });
    }

    const retProblemSet = await ProblemSet.findOne({ id: id });

    if (!retProblemSet) {
      return NextResponse.json({}, { status: 503 });
    }

    return NextResponse.json(
      { problemSetData: retProblemSet },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
  }
}
