import dbConnect from "@/lib/dbConnect";
import PassCode from "@/models/PassCode";
import User from "@/models/User";
import History from "@/models/History";
import ProblemSetIdList from "@/models/ProblemSetIdList";
import { hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { checkKey, salt } from "@/config/key";
import { generateRandomCode } from "@/utils/randomCode";

export async function POST(request: any) {
  try {
    await dbConnect();

    const { password, email, number, remain } = await request.json();

    const name = checkKey(password);

    if (!name.length) return NextResponse.json({}, { status: 501 });

    const hashedEmail = hashSync(email, salt);

    const user = await User.findOne({ email: hashedEmail });
    let doneList: Array<string> = [];
    if (user) doneList = user.done;

    const tmp = await ProblemSetIdList.find({});
    let currentProblemSetIdList = [];
    if (tmp.length)
      currentProblemSetIdList = tmp[0].list.filter((item: string) => {
        return !doneList.includes(item);
      });

    if (currentProblemSetIdList.length < number) {
      return NextResponse.json({}, { status: 502 });
    }

    let passcodeList = [];
    for (let i = 0; i < Math.min(currentProblemSetIdList.length, number); ++i) {
      let passcode = generateRandomCode(6);
      let hashedPasscode = hashSync(passcode, salt);
      const dist = currentProblemSetIdList[i];

      while (await PassCode.findOne({ code: hashedPasscode })) {
        passcode = generateRandomCode(6);
        hashedPasscode = hashSync(passcode, salt);
      }

      passcodeList.push(passcode);

      const newPassCode = new PassCode({
        code: hashedPasscode,
        dist: dist,
        remain: remain,
      });
      await newPassCode.save();
    }

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newHistory = new History({
      type: "create passcode package",
      body:
        name +
        " create " +
        number.toString() +
        " code for " +
        email +
        " remain: " +
        remain.toString(),
      time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
    });
    await newHistory.save();

    return NextResponse.json(
      { passcodeListData: passcodeList },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
  }
}
