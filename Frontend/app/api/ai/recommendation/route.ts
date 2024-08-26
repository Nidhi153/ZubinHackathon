import Event from "@/app/models/Event";
import User from "@/app/models/User";
import axios from "axios";
import dotenv from "dotenv";
import { NextResponse } from "next/server";
import connect from "../../../lib/database";

interface Message {
  skills: [string]; // the skills of the volunteer
  events: [Event]; // all the possible events
}
interface Event {
  skills: [string];
  eventid: string;
}
interface Response {
  eventid: string;
  similarity: number;
}
interface Responses {
  responses: [Response];
}
dotenv.config();

export async function POST(req: Request) {
  const data = await req.json();
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
    return NextResponse.json({
      message: "Message not updated to mongodb",
      status: 404,
    });
  }

  const userId = data.userId;
  const user = await User.findOne({
    _id: userId,
  });

  if (!user) {
    return NextResponse.json({
      message: "User not found",
      status: 404,
    });
  }
  const userSkills = user.skills;
  if (!userSkills) {
    return NextResponse.json({
      message: "Register an event first!",
      status: 404,
    });
  }

  if (userSkills.length === 0) {
    return NextResponse.json({
      message: "Register an event first!",
      status: 404,
    });
  }

  const events = await Event.find({});

  let eventsModified = [];
  for (let i = 0; i < events.length; i++) {
    if (
      events[i].registered_volunteers &&
      events[i].registered_volunteers.includes(userId)
    ) {
      continue;
    }
    if (
      events[i].registered_users &&
      events[i].registered_users.includes(userId)
    ) {
      continue;
    }
    eventsModified.push({
      skills: events[i].skills,
      eventid: events[i]._id.toHexString(),
    });
  }
  // console.log(eventsModified);

  const payload = {
    skills: userSkills,
    events: eventsModified,
  };

  let url = `http://localhost:8000/ai/recommendation`;
  const res = await axios.post(url, payload);
  const resData = res.data;
  console.log(resData.events);
  let recommendedEvents = [];
  if (resData.events.length === 0) {
    return NextResponse.json({
      message: "No events found",
      status: 404,
    });
  }

  for (let i = 0; i < resData.events.length; i++) {
    let event = await Event.findOne({
      _id: resData.events[i].eventid,
    });
    recommendedEvents.push(event);
  }
  if (resData) {
    return NextResponse.json({ recommendedEvents, status: 200 });
  } else {
    return NextResponse.json({
      message: "Message not updated to mongodb",
      status: 404,
    });
  }
}
