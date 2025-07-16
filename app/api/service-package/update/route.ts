import dbConnect from "@/lib/dbConnect";
import ServicePackage from "@/models/ServicePackage";
import History from "@/models/History";
import { NextResponse } from "next/server";
import { checkKey } from "@/config/key";

export async function POST(request: any) {
  try {
    await dbConnect();

    const { password, id, name, describe, price, discount, color } =
      await request.json();

    const whoPost = checkKey(password);
    if (!whoPost.length) return NextResponse.json({}, { status: 501 });

    await ServicePackage.findOneAndUpdate(
      { id: id },
      {
        id: id,
        name: name,
        describe: describe,
        price: price,
        discount: discount,
        color: color,
      },
    );

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newHistory = new History({
      type: "add service package",
      body: whoPost + " update " + id + " package with name: " + name,
      time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
    });
    await newHistory.save();

    return NextResponse.json({ message: "Đã cập nhật" }, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
