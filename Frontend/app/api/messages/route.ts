import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import connect from "../../lib/database";
import axios from "axios";
import dotenv from "dotenv";
import Event from "../../models/Event";
import User from "../../models/User";

export async function POST(req: Request) {
  let data: Message = await req.json();

  console.log(data);

  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
    return NextResponse.json({
      message: "Message post to server failed",
      status: 404,
    });
  }

  const eventId = data.id;
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
  console.log(event);
  //   let phonenumbers = ["+85296035568", "+85298226209"];
  let phonenumbers = [];

  for (let i = 0; i < event.registered_users.length; i++) {
    let user = await User.find({ _id: event.registered_users[i] });
    if (user.length > 0) {
      phonenumbers.push(user[0].phoneno);
    }
  }
  console.log(phonenumbers);

  const payload = {
    phonenumbers: phonenumbers,
    broadcastmessage: data.broadcastmessage,
  };

  console.log(payload);
  let url = `http://localhost:8000/ai/whatsapp/broadcast`;

  const res = await axios.post(url, payload);
  if (res.status === 200) {
    return NextResponse.json({
      message: "Broadcasted",
      status: 200,
    });
  }

  return NextResponse.json({
    message: "Event not found",
    status: 404,
  });
}
