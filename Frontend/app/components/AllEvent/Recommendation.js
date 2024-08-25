"use client";
import { useState, useEffect } from "react";
import cookies from "js-cookie";
import { set } from "mongoose";
const EventPage = () => {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [recommendation, setRecommendation] = useState([]);
  useEffect(() => {
    const userId = cookies.get("userId");
    setUserId(userId);
    const role = cookies.get("role");
    setRole(role);
    let init = async () => {
      const res = await fetch("/api/ai/recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();

      console.log(data);

      //   alert(data.message);
      if (data.status == 200) {
        setRecommendation(data.recommendedEvents);
      }
    };
    if (role && role == "volunteer") init();
  }, []);
  return (
    <div>
      {userId ? (
        role === "volunteer" && (
          <div>
            <h1>Recommendation for user</h1>
            {recommendation.map((event) => (
              <div key={event._id}>
                <h1>{event.title}</h1>
                <p>{event.description}</p>
                <p>{event.date}</p>
                <p>{event.time}</p>
                <p>{event.location}</p>
                <p>{event.organizer}</p>
              </div>
            ))}
          </div>
        )
      ) : (
        <div>
          <h1>Sign in to see recommendations</h1>
        </div>
      )}
    </div>
  );
};

export default EventPage;
