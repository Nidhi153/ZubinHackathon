import { NextResponse } from "next/server";
import connect from "../../../lib/database";
import Event from "../../../models/Event";
export async function POST(req: Request) {
  async function checkPrimaryKey() {
    try {
      await connect();
      const indexes = await Event.collection.indexes();
      console.log("Indexes for events collection:", indexes);
    } catch (e) {
      console.log("Error checking primary key:", e);
    }
  }

  await checkPrimaryKey();
  console.log("create event post request called");
  const data = await req.json();
  // console.log(data);
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
  data.registered_users = [];
  data.registered_volunteers = [];
  data.attendees = [];
  delete data.id;
  console.log(data);
  const newEvent = await Event.create(data);
  console.log("newEvent", newEvent);
  if (!newEvent) {
    return NextResponse.json({
      message: "Error creating event",
      status: 404,
    });
  }

  return NextResponse.json({
    message: "Event created successfully",
    status: 200,
  });
}
