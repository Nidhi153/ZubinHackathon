"use client";
import { useState, useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";

export default function Authentication({ setUserId }) {
  return (
    <div>
      {/* <Signup setUserId={setUserId} /> */}
      <Login setUserId={setUserId} />
    </div>
  );
}
