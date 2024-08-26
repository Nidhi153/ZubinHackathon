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

  const eventId = data.eventId;
  const email = data.email;
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
    if (event.attendees.includes(email)) {
      return NextResponse.json({
        message: "User already registered",
        status: 404,
      });
    }
    event.attendees.push(email);
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
