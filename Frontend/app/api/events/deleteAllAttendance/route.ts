import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import User from "../../../models/User";
import Event from "../../../models/Event";
import connect from "../../../lib/database";
export async function POST(req: Request) {
  console.log("POST /api/events/deleteAllAttendance");
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }
  const data = await req.json();

  const eventId = data.eventId;
  let event = await Event.find({ _id: eventId });
  if (!event) {
    return NextResponse.json({
      message: "Event not found",
      status: 404,
    });
  }
  if (event.length > 0) {
    event = event[0];
  }
  if (!event.attendees) {
    event.attendees = [];
  }

  try {
    event.attendees = [];
    await event.save();
  } catch (e) {
    return NextResponse.json({
      message: "Error registering event",
      status: 404,
    });
  }
  return NextResponse.json({
    message: "Event registered",
    status: 200,
    added: true,
  });
}
