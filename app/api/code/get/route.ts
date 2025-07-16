import dbConnect from "@/lib/dbConnect";
import PassCode from "@/models/PassCode";
import { hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { checkKey, salt } from "@/config/key";

export async function POST(request: any) {
  try {
    await dbConnect();

    const { password, passcode } = await request.json();

    const name = checkKey(password);

    if (!name.length) return NextResponse.json({}, { status: 501 });

    const hashedPasscode = hashSync(passcode, salt);

    const retPasscode = await PassCode.findOne({ code: hashedPasscode });

    if (!retPasscode) {
      return NextResponse.json({}, { status: 502 });
    }

    return NextResponse.json({ retPasscodeData: retPasscode }, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
