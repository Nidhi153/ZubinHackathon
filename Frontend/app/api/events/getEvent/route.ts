import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import User from "../../../models/User";
import Event from "../../../models/Event";
import connect from "../../../lib/database";
export async function POST(req: Request) {
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }
  const data = await req.json();
  const id = data.id;
  const event = await Event.find({ _id: id });
  console.log("event", event);

  return NextResponse.json({
    message: "Found event",
    event: event,
  });
}
