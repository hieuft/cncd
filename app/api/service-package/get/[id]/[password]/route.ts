import { checkKey } from "@/config/key";
import dbConnect from "@/lib/dbConnect";
import ServicePackage from "@/models/ServicePackage";
import { NextResponse } from "next/server";

export async function GET(req: any, { params }: { params: any }) {
  try {
    await dbConnect();

    const { id, password } = await params;

    const whoDo = checkKey(password);

    if (!whoDo) {
      return NextResponse.json({}, { status: 501 });
    }

    const retServicePackage = await ServicePackage.findOne({ id: id });

    if (!retServicePackage) {
      return NextResponse.json({}, { status: 503 });
    }

    return NextResponse.json(
      { servicePackageData: retServicePackage },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
  }
}
