"use client";
import { useState, useEffect } from "react";
import EventBox from "./EventBox";
import "./Event.css";
import styles from "./EventCardGroup/EventCardGroup.module.scss";

export default function Event({ filterFunction }) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    let fetchEvents = async () => {
      const res = await fetch("/api/events/allEvents");
      const data = await res.json();
      if (data) {
        if (data.events) {
          setEvents(data.events);
        }
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      console.log(data);
      if (data) {
        if (data.events) {
          setEvents(data.events);
        }
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = filterFunction ? events.filter(filterFunction) : events;

  return (
    <div>
      <div className="styles.eventCards">
        {/* {events &&
          events.map((event) => <EventBox key={event._id} event={event} />)} */}
        {filteredEvents &&
          filteredEvents.map((event) => 
          <EventBox key={event._id} event={event} 
        />)}
      </div>
    </div>
  );
}
