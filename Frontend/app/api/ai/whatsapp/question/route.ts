import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import WhatsappResponse from "../../../../models/WhatsappResponse";
import connect from "../../../../lib/database";

interface Message {
  message: string;
  phonenumber: string;
  categories: [string];
}
export async function POST(req: Request) {
  const data: Message = await req.json();
  if (!data.phonenumber) {
    return NextResponse.json({
      message: "Phone number is required",
    });
  }

  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }

  try {
    const res = await WhatsappResponse.create(data);
    if (res) {
      return NextResponse.json({
        message: "Message updated to mongodb",
        status: 200,
      });
    }
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
    return NextResponse.json({
      message: "Message not updated to mongodb",
      error: e,
      status: 404,
    });
  }
}
