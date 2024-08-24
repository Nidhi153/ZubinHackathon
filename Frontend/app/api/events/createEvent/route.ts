import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
import User from "../../models/User";
import Event from "../../models/Event";
import connect from "../../lib/database";
export async function POST(req: Request) {
  console.log("create event post request called");
  const data = await req.json();
  try {
    await connect();
  } catch (e) {
    console.log("Error connecting to mongodb:", e);
  }

  let combineDateAndTime = (date, time) => {
    let timeString = time + ":00";
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();
    var dateString = "" + year + "-" + month + "-" + day;
    var combined = Date.parse(dateString + " " + timeString);

    var combinedDate = new Date(combined);
    var combinedDateHKString = combinedDate.toLocaleString("en-US", {
      timeZone: "Asia/Hong_Kong",
    });
    var combinedDateHK = new Date(combinedDateHKString);
    return combinedDateHK;
  };
  const startDate = new Date(
    combineDateAndTime(new Date(data.date), data.start_time)
  );
  const endDate = new Date(
    combineDateAndTime(new Date(data.date), data.end_time)
  );
  data.start_datetime = startDate;
  data.end_datetime = endDate;
  const newEvent = await Event.create(data);
  if (!newEvent) {
    return NextResponse.json({
      message: "Error creating event",
    });
  }

  return NextResponse.json({
    message: "Event created successfully",
  });
}
