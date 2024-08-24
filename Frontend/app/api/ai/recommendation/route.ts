import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import connect from "../../../lib/database";
import axios from "axios";
import dotenv from "dotenv";

interface Message {
  skills: [string];
  events: [string];
}

dotenv.config();

export async function POST(req: Request) {
  const data: Message = await req.json();

  let port = process.env.CS_PORT || 5000;
  const res = await axios.post(`http://localhost:${port}/api/ai/chatbot`, {
    data,
  });
  const resData = res.json();
  if (resData) {
    return NextResponse.json(resData);
  } else {
    return NextResponse.json({
      message: "Message not updated to mongodb",
      status: 404,
    });
  }
}
