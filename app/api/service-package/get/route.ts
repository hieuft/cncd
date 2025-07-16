import dbConnect from "@/lib/dbConnect";
import ServicePackage from "@/models/ServicePackage";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const retServicePackage = await ServicePackage.find({});

    return NextResponse.json(
      { servicePackageData: retServicePackage },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
  }
}
