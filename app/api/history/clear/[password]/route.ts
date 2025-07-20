import dbConnect from "@/lib/dbConnect";
import History from "@/models/History";
import { NextResponse } from "next/server";
import { checkSuperKey } from "@/config/key";

export async function GET(req: any, { params }: { params: any }) {
  try {
    await dbConnect();

    const { password } = await params;

    if (!checkSuperKey(password)) {
      return NextResponse.json({}, { status: 501 });
    }

    await History.deleteMany({});

    return NextResponse.json({ historyData: [] }, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
