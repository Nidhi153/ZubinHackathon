"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Event from "./components/AllEvent/AllEvent";

export default function Home() {
  useEffect(() => {}, []);
  return (
    <div>
      <Event />
    </div>
  );
}
