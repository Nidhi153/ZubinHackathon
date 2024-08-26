import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import connect from "../../../lib/database";
import WhatsappResponse from "@/app/models/WhatsappResponse";

export async function GET() {
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
    return NextResponse.json({
      message: "Message not updated to mongodb",
      error: e,
      status: 404,
    });
  }
  try {
    const res = await WhatsappResponse.find({}).sort({
      created_at: -1,
    });

    return NextResponse.json(res);
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
    return NextResponse.json({
      message: "Message not updated to mongodb",
      error: e,
      status: 404,
    });
  }
}
