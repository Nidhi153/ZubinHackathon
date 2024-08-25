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
  const data = await req.json();
  console.log(data);
  if (!data.phonenumber) {
    return NextResponse.json({
      message: "Phone number is required",
    });
  }
  console.log(2);

  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }
  console.log(3);

  try {
    const res = await WhatsappResponse.create(data);
    console.log(res);
    if (res) {
      console.log(4);
      return NextResponse.json({
        info: "Message updated to mongodb",
      });
    }
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
    return NextResponse.json({
      info: "Message not updated to mongodb",
    });
  }
}
