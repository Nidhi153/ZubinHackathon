import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import User from "../../../models/User";
import Event from "../../../models/Event";
import connect from "../../../lib/database";
export async function POST() {
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }
  const data = await req.json();

  const userId = data.userId;
  const user = await User.find({ _id: userId });
  if (!user) {
    return NextResponse.json({
      message: "User not found",
      status: 404,
    });
  }
  if (!user.registered_events) {
    return NextResponse.json({
      message: "User has not registered for any events",
      status: 404,
    });
  }

  const eventIds = user.registered_events;

  if (eventIds.length === 0) {
    return NextResponse.json({
      message: "User has not registered for any events",
      status: 404,
    });
  }

  const events = await Event.find({ _id: { $in: eventIds } }).sort({
    created_at: -1,
  });
  console.log("events", events);

  return NextResponse.json({
    message: "Found events",
    events: events,
  });
}