import { NextResponse } from "next/server";
import connect from "../../../lib/database";
import Event from "../../../models/Event";
import User from "../../../models/User";
export async function POST(req: Request) {
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }
  const data = await req.json();

  const userId = data.userId;
  let user = await User.find({ _id: userId });
  if (!user) {
    return NextResponse.json({
      message: "User not found",
      status: 404,
    });
  }
  if (user.length > 0) {
    user = user[0];
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

  return NextResponse.json({
    message: "Found events",
    events: events,
  });
}
