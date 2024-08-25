import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import connect from "../../../../lib/database";
import axios from "axios";
import dotenv from "dotenv";

interface Message {
  phonenumbers: [string];
  broadcastmessage: string;
}

interface Response {
  result: string;
  status: number;
}
dotenv.config();

export async function POST(req: Request) {
  const data: Message = await req.json();

  console.log(data);
  let url = `http://localhost:8000/ai/whatsapp/images`;

  const res = await axios.post(url, data);

  const resData = res.data;

  console.log(resData);
  //   if (resData.status === 200) {
  //     return NextResponse.json({
  //       message: "Message posted to server",
  //       status: 200,
  //     });
  //   } else {
  //     return NextResponse.json({
  //       message: "Message post to server failed",
  //       status: 404,
  //     });
  //   }
  return NextResponse.json({
    message: "Message posted to server",
    status: 200,
  });
}