import { NextResponse } from "next/server";
import User from "../../models/User";
import connect from "../../lib/database";

export async function POST(req: Request) {
  const data = await req.json();

  if (!data.userId) {
    return NextResponse.json({
      message: "User ID is required",
    });
  }
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }

  const res = await User.find({ _id: data.userId });

  if (!res) {
    return NextResponse.json({
      message: "User does not exist",
    });
  }
  if (Array.isArray(res)) {
    return NextResponse.json(res[0]);
  }
  return NextResponse.json(res);
}
