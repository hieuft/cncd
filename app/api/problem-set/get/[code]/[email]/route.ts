import dbConnect from "@/lib/dbConnect";
import PassCode from "@/models/PassCode";
import ProblemSet from "@/models/ProblemSet";
import User from "@/models/User";
import History from "@/models/History";
import { hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { salt } from "@/config/key";

export async function GET(req: any, { params }: { params: any }) {
  try {
    await dbConnect();

    const { code, email } = await params;

    const hashed = hashSync(code, salt);

    const passcode = await PassCode.findOne({ code: hashed });
    if (!passcode || passcode.remain <= 0) {
      return NextResponse.json({}, { status: 503 });
    }

    const problemSetId = passcode.dist;
    const problemSet = await ProblemSet.findOne({ id: problemSetId });

    if (problemSet) {
      if (passcode.remain == 1) {
        await PassCode.findOneAndDelete({ code: hashed });
      } else {
        await PassCode.findOneAndUpdate(
          { code: hashed },
          { code: hashed, dist: problemSetId, remain: passcode.remain - 1 },
        );
      }

      if (email) {
        const hashedEmail = hashSync(email, salt);
        const user = await User.findOne({ email: hashedEmail });
        if (!user) {
          const newUser = new User({
            email: hashedEmail,
            point: 1,
            done: [problemSetId],
          });
          await newUser.save();
        } else {
          let doneList = user.done;
          let p = 0;
          if (!doneList.includes(problemSetId)) {
            doneList.push(problemSetId);
            p = 1;
          }
          await User.findOneAndUpdate(
            { email: hashedEmail },
            { email: hashedEmail, point: user.point + p, done: doneList },
          );
        }
      }

      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const newHistory = new History({
        type: "do exam",
        body: (email ? email.split("@")[0] : "Unknown") + " do " + problemSetId,
        time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
      });
      await newHistory.save();

      return NextResponse.json({ rawData: problemSet.body }, { status: 201 });
    }
  } catch (err) {
    console.log(err);
  }
}
