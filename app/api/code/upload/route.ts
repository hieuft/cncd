import dbConnect from "@/lib/dbConnect";
import PassCode from "@/models/PassCode";
import History from "@/models/History";
import { hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { checkKey, salt } from "@/config/key";

export async function POST(request: any) {
  try {
    await dbConnect();

    const { password, passcode, dist, remain } = await request.json();

    const name = checkKey(password);

    if (!name.length) return NextResponse.json({}, { status: 501 });

    const hashedPasscode = hashSync(passcode, salt);

    if (await PassCode.findOne({ code: hashedPasscode })) {
      return NextResponse.json({}, { status: 502 });
    }

    const newPassCode = new PassCode({
      code: hashedPasscode,
      dist: dist,
      remain: remain,
    });
    await newPassCode.save();

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newHistory = new History({
      type: "add passcode",
      body:
        name +
        " add " +
        hashedPasscode +
        " to " +
        dist +
        " with " +
        remain +
        " usetimes",
      time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
    });
    await newHistory.save();

    return NextResponse.json(newPassCode, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
