import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import connect from "../../../lib/database";
import axios from "axios";
import dotenv from "dotenv";

interface Message {
  skills: [string];
  events: [Event];
}
interface Event {
  skills: [string];
  eventid: string;
}
interface Response {
  eventid: string;
  similarity: number;
}
interface Responses {
  responses: [Response];
}
dotenv.config();

export async function POST(req: Request) {
  const data: Message = await req.json();

  // let port = process.env.SERVER_PORT || 50;
  // let SERVER_DOMAIN = process.env.SERVER_DOMAIN || "localhost";
  // const res: Responses = await axios.post(
  //   `http://${SERVER_DOMAIN}:${port}/api/ai/recommendation`,
  //   {
  //     data,
  //   }
  // );
  let url = `http://localhost:8000/ai/recommendation`;
  const res = await axios.post(url, data);
  const resData = res.data;

  if (resData) {
    return NextResponse.json(resData);
  } else {
    return NextResponse.json({
      message: "Message not updated to mongodb",
      status: 404,
    });
  }
}
