"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import "./Event.css";
import RegisteredEventBox from "./RegisteredEventBox";

export default function RegisteredEvent() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    let userId = Cookies.get("userId");
    if (userId) {
      setUserId(userId);
      let fetchEvents = async () => {
        const res = await fetch("/api/events/registeredEvents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        console.log(data);
        if (data) {
          setRegisteredEvents(data.events);
        }
      };

      fetchEvents();
    }
  }, []);

  return (
    <div className="">
      {registeredEvents &&
        registeredEvents.length > 0 &&
        registeredEvents.map((event) => (
          <RegisteredEventBox key={event._id} event={event} />
        ))}
    </div>
  );
}
