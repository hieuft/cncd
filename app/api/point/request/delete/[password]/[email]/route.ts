import dbConnect from "@/lib/dbConnect";
import PointingRequest from "@/models/PointingRequest";
import User from "@/models/User";
import History from "@/models/History";
import { hashSync } from "bcrypt-ts";
import { NextResponse } from "next/server";
import { checkSuperKey, salt } from "@/config/key";
import { handlePoint } from "@/utils/pointing";

export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { password, email } = await params;

    if (!checkSuperKey(password)) {
      return NextResponse.json({}, { status: 501 });
    }

    const hashedEmail = hashSync(email, salt);

    const curUser = await User.findOne({ email: hashedEmail });

    await User.findOneAndUpdate(
      { email: hashedEmail },
      { email: hashedEmail, point: handlePoint(curUser.point).remain },
    );

    await PointingRequest.findOneAndDelete({ who: email });

    const retPointingRequest = await PointingRequest.find({});

    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newHistory = new History({
      type: "solve request",
      body: "solve " + email.split("@")[0] + " request",
      time: hour + ":" + minute + " - " + day + "/" + month + "/" + year,
    });
    await newHistory.save();

    return NextResponse.json(
      { pointingRequestData: retPointingRequest },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
  }
}
