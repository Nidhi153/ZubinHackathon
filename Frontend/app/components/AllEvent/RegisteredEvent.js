"use client";
import { useState, useEffect } from "react";
import RegisteredEventBox from "./RegisteredEventBox";
import "./Event.css";
import Cookies from "js-cookie";
import getAllEvents from "../../api/event";

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
    <div>
      <div className="container">
        {registeredEvents &&
          registeredEvents.length > 0 &&
          registeredEvents.map((event) => (
            <RegisteredEventBox key={event._id} event={event} />
          ))}
      </div>
    </div>
  );
}
