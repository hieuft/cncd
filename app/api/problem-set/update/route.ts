import dbConnect from "@/lib/dbConnect";
import ProblemSet from "@/models/ProblemSet";
import History from "@/models/History";
import { NextResponse } from "next/server";
import { checkKey } from "@/config/key";

export async function POST(request: any) {
  try {
    await dbConnect();

    const { password, id, body } = await request.json();

    const name = checkKey(password);
    if (!name.length) return NextResponse.json({}, { status: 501 });

    if (!(await ProblemSet.findOne({ id: id }))) {
      return NextResponse.json({}, { status: 502 });
    }

    await ProblemSet.findOneAndUpdate(
      { id: id },
      {
        id: id,
        body: body,
      },
    );

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newHistory = new History({
      type: "update problem set",
      body: name + " update " + id,
      time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
    });
    await newHistory.save();

    return NextResponse.json({}, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
