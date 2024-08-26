import { NextResponse } from "next/server";
import connect from "../../../lib/database";
import Event from "../../../models/Event";
export async function GET() {
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }

  const events = await Event.find({}).sort({ created_at: -1 });

  return NextResponse.json({
    message: "Found events",
    events: events,
  });
}
