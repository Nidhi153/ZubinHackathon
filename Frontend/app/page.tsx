"use client";

import { useEffect, useState } from "react";
import Authentication from "./components/Authentication";
// import Event from "./components/Event";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import Cookies from "js-cookie";
import Event from "./components/Event/AllEvent";

export default function Home() {
  useEffect(() => {
    const userId = Cookies.get("userId");
    console.log("userid", userId);
  }, []);
  return (
    <div>
      <Event />
    </div>
  );
}