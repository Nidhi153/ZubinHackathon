"use client";
import React from "react";

import Event from "../Event/AllEvent";

const PastEventPage = () => {
  const filterPastEvents = (event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate < today;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 10px",
        marginLeft: "25%",
        marginRight: "25%",
      }}
    >
      <Event filterFunction={filterPastEvents} />
    </div>
  );
};

export default PastEventPage;
