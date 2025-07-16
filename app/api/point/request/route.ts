import dbConnect from "@/lib/dbConnect";
import PointingRequest from "@/models/PointingRequest";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { hashSync } from "bcrypt-ts";
import { salt } from "@/config/key";
import { handlePoint } from "@/utils/pointing";

export async function POST(request: any) {
  try {
    await dbConnect();

    const { email } = await request.json();

    const hashed = hashSync(email, salt);

    const user = await User.findOne({ email: hashed });

    const ret = handlePoint(user.point);

    if (!user || user.point < 20) {
      return NextResponse.json(
        { message: "Bạn không đủ điểm để yêu cầu" },
        { status: 201 },
      );
    }

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newRequest = new PointingRequest({
      who: email,
      number: ret.reward,
      time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
    });
    await newRequest.save();

    return NextResponse.json(
      {
        message:
          "Đã gửi yêu cầu đổi " +
          ret.origin.toString() +
          " điểm thành " +
          ret.reward.toString() +
          " đề, còn dư " +
          ret.remain.toString() +
          " điểm",
      },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
  }
}
