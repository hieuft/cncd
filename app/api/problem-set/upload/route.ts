import dbConnect from "@/lib/dbConnect";
import ProblemSet from "@/models/ProblemSet";
import ProblemSetIdList from "@/models/ProblemSetIdList";
import History from "@/models/History";
import { NextResponse } from "next/server";
import { checkKey } from "@/config/key";

export async function POST(request: any) {
  try {
    await dbConnect();

    const { password, id, body } = await request.json();

    const name = checkKey(password);
    if (!name.length) return NextResponse.json({}, { status: 501 });

    if (await ProblemSet.findOne({ id: id })) {
      return NextResponse.json({}, { status: 502 });
    }

    const tmp = await ProblemSetIdList.find({});
    let currentProblemSetIdList = [];
    if (tmp.length) currentProblemSetIdList = tmp[0].list;
    currentProblemSetIdList.push(id);

    await ProblemSetIdList.findOneAndUpdate(
      {},
      { list: currentProblemSetIdList },
    );

    const newProblemSet = new ProblemSet({ id: id, body: body });
    await newProblemSet.save();

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newHistory = new History({
      type: "add problem set",
      body: name + " add " + id,
      time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
    });
    await newHistory.save();

    return NextResponse.json(newProblemSet, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
