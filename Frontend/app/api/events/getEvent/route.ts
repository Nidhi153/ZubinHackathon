import { NextResponse } from "next/server";
import connect from "../../../lib/database";
import Event from "../../../models/Event";
export async function POST(req: Request) {
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }
  const data = await req.json();
  const id = data.id;
  const event = await Event.find({ _id: id });

  return NextResponse.json({
    message: "Found event",
    event: event,
  });
}
