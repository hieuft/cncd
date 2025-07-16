import dbConnect from "@/lib/dbConnect";
import ProblemSet from "@/models/ProblemSet";
import History from "@/models/History";
import { NextResponse } from "next/server";
import { checkKey } from "@/config/key";

export async function POST(request: any) {
  try {
    await dbConnect();

    const { password, id } = await request.json();

    const name = checkKey(password);
    if (!name.length) return NextResponse.json({}, { status: 501 });

    await ProblemSet.findOneAndDelete({ id: id });

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newHistory = new History({
      type: "delete problem set",
      body: name + " delete " + id,
      time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
    });
    await newHistory.save();

    return NextResponse.json({}, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
