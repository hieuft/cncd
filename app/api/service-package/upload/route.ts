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

    if (await ServicePackage.findOne({ id: id })) {
      return NextResponse.json({}, { status: 502 });
    }

    const newServicePackage = new ServicePackage({
      id: id,
      name: name,
      describe: describe,
      price: price,
      discount: discount,
      color: color,
    });
    await newServicePackage.save();

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newHistory = new History({
      type: "add service package",
      body: whoPost + " add " + id + " package with name: " + name,
      time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
    });
    await newHistory.save();

    return NextResponse.json({ message: "Đã đăng" }, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
