import { NextResponse } from "next/server";
import User from "../../models/User";
import connect from "../../lib/database";

export async function POST(req: Request) {
  const data = await req.json();
  console.log(data);
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

  console.log(res);
  if (!res || res.length === 0) {
    return NextResponse.json({
      message: "User does not exist",
      status: 404,
    });
  }
  if (Array.isArray(res)) {
    return NextResponse.json({ user: res[0], status: 200 });
  }
  return NextResponse.json({ user: res, status: 200 });
}
