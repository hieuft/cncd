import dbConnect from "@/lib/dbConnect";
import ProblemSet from "@/models/ProblemSet";
import ProblemSetIdList from "@/models/ProblemSetIdList";
import History from "@/models/History";
import { NextResponse } from "next/server";
import { checkKey } from "@/config/key";

export async function POST(request: any) {
  try {
    await dbConnect();

    const { password, id } = await request.json();

    const name = checkKey(password);
    if (!name.length) return NextResponse.json({}, { status: 501 });

    const tmp = await ProblemSetIdList.find({});
    let currentProblemSetIdList = [];
    if (tmp.length)
      currentProblemSetIdList = tmp[0].list.filter((item: string) => {
        return item != id;
      });

    await ProblemSetIdList.findOneAndUpdate(
      {},
      { list: currentProblemSetIdList },
    );

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
