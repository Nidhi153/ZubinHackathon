import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import connect from "../../../lib/database";
import axios from "axios";
import dotenv from "dotenv";

interface Message {
  input: string;
}
interface Response {
  text: string;
  title: string;
}

dotenv.config();

export async function POST(req: Request) {
  const data: Message = await req.json();

  // let port = process.env.SERVER_PORT || 50;
  // let SERVER_DOMAIN = process.env.SERVER_DOMAIN || "localhost";
  // const res = await axios.post(
  //   `http://${SERVER_DOMAIN}:${port}/api/ai/chatbot`,
  //   {
  //     data,
  //   }
  // );

  let url = `http://localhost:8000/ai/chatbot`;
  const res = await axios.post(url, data);
  const resData = res.data;
  console.log(resData);

  if (resData) {
    return NextResponse.json(resData);
  } else {
    return NextResponse.json({
      message: "Message not updated to mongodb",
      status: 404,
    });
  }
}
