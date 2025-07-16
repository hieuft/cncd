import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { salt } from "@/config/key";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { email } = await params;

    const hashed = hashSync(email, salt);

    const user = await User.findOne({ email: hashed });

    if (user) {
      return NextResponse.json({ point: user.point }, { status: 201 });
    } else {
      return NextResponse.json({ point: "0" }, { status: 201 });
    }
  } catch (err) {
    console.log(err);
  }
}
