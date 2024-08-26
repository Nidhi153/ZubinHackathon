import { NextResponse } from "next/server";
import connect from "../../lib/database";

import * as moment from "moment";

const oneDayBeforeNow = moment().subtract(1, "days").toDate();

interface Event {
  description: string;
  phonenumber: [string];
}
export async function GET() {
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }
  const res = await Event.find({ start_datetime: oneDayBeforeNow }).sort({
    created_at: -1,
  });
  let events = [];
  for (let i = 0; i < res.length; i++) {
    let phonenumber = [];
    if (res[i].registered_members && res[i].registered_members.length > 0) {
      for (let j = 0; j < res[i].registered_members.length; j++) {
        phonenumber.push(res[i].registered_members[j].phoneno);
      }
    } else {
      continue;
    }
    let event: Event = {
      description: res[i].description || "There is a event tomorrow",
      phonenumber: phonenumber,
    };

    events.push(event);
  }
  if (res) {
    return NextResponse.json({
      events: events,
    });
  } else {
    return NextResponse.json({
      message: "Event not found",
      status: 404,
    });
  }
}
