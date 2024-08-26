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
    if (!user.registered_events.includes(eventId)) {
      return NextResponse.json({
        message: "User is not registered for this event",
        status: 404,
      });
    }
    for (let i = 0; i < user.registered_events.length; i++) {
      console.log(user.registered_events[i]);
      console.log(user.registered_events[i].toHexString());
    }
    user.registered_events = user.registered_events.filter(
      (id) => id.toHexString() !== eventId
    );
    console.log(user);
    await user.save();

    if (!event.registered_volunteers.includes(userId)) {
      return NextResponse.json({
        message: "User is not registered for this event",
        status: 404,
      });
    }
    event.registered_volunteers = event.registered_volunteers.filter(
      (id) => id.toHexString() !== userId
    );
    await event.save();
    console.log(event);
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
