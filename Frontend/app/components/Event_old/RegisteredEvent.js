"use client";
import { useState, useEffect } from "react";
import { RegisteredEventBox } from "./RegisteredEventBox";
import "./Event.css";
import getAllEvents from "../../api/event";

export default function RegisteredEvent({ setUserId }) {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  useEffect(() => {
    let fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      console.log(data);
      if (data) {
        if (data.events) {
          setRegisteredEvents(data.events);
        }
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="container">
        <h1>Registered events</h1>
        {registeredEvents &&
          registeredEvents.map((event) => (
            <RegisteredEventBox key={event._id} event={event} />
          ))}
      </div>
    </div>
  );
}
