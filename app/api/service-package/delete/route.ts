import dbConnect from "@/lib/dbConnect";
import ServicePackage from "@/models/ServicePackage";
import History from "@/models/History";
import { NextResponse } from "next/server";
import { checkKey } from "@/config/key";

export async function POST(request: any) {
  try {
    await dbConnect();

    const { password, id } = await request.json();

    const name = checkKey(password);

    if (!name) {
      return NextResponse.json({}, { status: 501 });
    }

    const retServicePackage = await ServicePackage.findOneAndDelete({
      id: id,
    });

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newHistory = new History({
      type: "delete package",
      body: name + " delete " + id + " package",
      time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
    });
    await newHistory.save();

    return NextResponse.json({ message: "OK" }, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
