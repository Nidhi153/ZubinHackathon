"use client";
import { useState, useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";
import EventPage from "./AllEvent"

export default function Authentication({ setUserId }) {
  return (
    <div className="auth-container">
      <EventPage />
      {/* <Signup setUserId={setUserId} />
      <Login setUserId={setUserId} /> */}
    </div>
  );
}
