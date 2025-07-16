import dbConnect from "@/lib/dbConnect";
import PointingRequest from "@/models/PointingRequest";
import { hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { checkSuperKey, salt } from "@/config/key";

export async function GET(req: any, { params }: { params: any }) {
  try {
    await dbConnect();

    const { password } = await params;

    if (!checkSuperKey(password)) {
      return NextResponse.json({}, { status: 501 });
    }

    const retPointingRequest = await PointingRequest.find({});

    return NextResponse.json(
      { pointingRequestData: retPointingRequest },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
  }
}
