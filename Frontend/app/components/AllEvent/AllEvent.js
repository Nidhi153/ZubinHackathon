import React from "react";
// import Box from '@mui/material/Box';
import { Card } from "flowbite-react";
import { Box } from "@chakra-ui/react";

import EventData from "../../data/event.json";
import Event from "../Event/AllEvent";
import RegisteredEvent from "./RegisteredEvent";

const registerStyle = {
  fontSize: "25px",
};

const EventPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 10px",
        marginLeft: "5%",
        marginRight: "5%",
      }}
    >
      <br></br>
      <div style={{ width: "60%", borderRadius: "5px", padding: "10px" }}>
        <Event />
      </div>
      <div
        style={{
          width: "40%",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          // transform: "translate(35%, 3%)",
        }}
      >
        <h2 style={registerStyle} className="text-center">
          Registered Events
        </h2>
        <RegisteredEvent />
      </div>
    </div>
  );
};

export default EventPage;
