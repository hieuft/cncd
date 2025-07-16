import dbConnect from "@/lib/dbConnect";
import History from "@/models/History";
import { NextResponse } from "next/server";
import { checkSuperKey } from "@/config/key";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { password } = await params;

    if (!checkSuperKey(password)) {
      return NextResponse.json({}, { status: 501 });
    }

    const retHistory = await History.find({});

    return NextResponse.json({ historyData: retHistory }, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
