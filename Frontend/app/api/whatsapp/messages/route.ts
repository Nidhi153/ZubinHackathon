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
    // await WhatsappResponse.deleteMany({});
    // for (let i = 0; i < 3; i++) {
    //   await WhatsappResponse.create({
    //     message: "Hello",
    //     phonenumber: "+85212345678",
    //     categories: ["emergency", "tag2", "tag3"],
    //   });
    //   await WhatsappResponse.create({
    //     message: "Hello",
    //     phonenumber: "+85212345678",
    //     categories: ["tag2", "tag3"],
    //   });
    //   await WhatsappResponse.create({
    //     message: "Hello",
    //     phonenumber: "+85212345678",
    //     categories: ["emergency"],
    //   });
    // // }

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
