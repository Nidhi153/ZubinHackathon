import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import connect from "../../../../lib/database";
import axios from "axios";
import dotenv from "dotenv";

interface Message {
  phonenumbers: [string];
  broadcastmessage: string;
}

dotenv.config();

export async function POST(req: Request) {
  const data: Message = await req.json();

  let port = process.env.CS_PORT || 5000;
  const res = await axios.post(
    `http://localhost:${port}/api/ai/whatsapp/broadcast`,
    {
      data,
    }
  );
  const resData = res.json();
  if (resData.status === 200) {
    return NextResponse.json({
      message: "Message posted to server",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Message post to server failed",
      status: 404,
    });
  }
}
