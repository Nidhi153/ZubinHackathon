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

  const userId = data.userId;
  const eventId = data.eventId;
  let user = await User.find({ _id: userId });
  if (!user) {
    return NextResponse.json({
      message: "User not found",
      status: 404,
    });
  }
  let event = await Event.find({ _id: eventId });
  if (!event) {
    return NextResponse.json({
      message: "Event not found",
      status: 404,
    });
  }
  if (user.length > 0) {
    user = user[0];
  }
  if (event.length > 0) {
    event = event[0];
  }
  if (!user.registered_events) {
    user.registered_events = [];
  }
  try {
    if (user.registered_events.includes(eventId)) {
      return NextResponse.json({
        message: "User already registered for this event",
        status: 404,
      });
    }
    user.registered_events.push(eventId);

    await user.save();

    event.registered_users.push(userId);
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
  });
}
