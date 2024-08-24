import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import User from "../../../models/User";
import Event from "../../../models/Event";
import connect from "../../../lib/database";
export async function GET() {
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }

  const events = await Event.find({}).sort({ created_at: -1 });
  console.log("events", events);

  return NextResponse.json({
    message: "Found events",
    events: events,
  });
}
