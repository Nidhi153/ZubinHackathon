import { Card } from "flowbite-react";
import "./Event.css";
export default function EventBox({ event }) {
  return (
    <div className="event-box">
      <Card>
        <h2>{event.title}</h2>
        <hr />
        <p>{event.description}</p>
        <p>Event date: {event.date}</p>
      </Card>
    </div>
  );
}
