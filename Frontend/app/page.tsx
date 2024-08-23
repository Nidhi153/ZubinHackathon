"use client";
import Cookies from "js-cookie";
import Event from "./components/Event/AllEvent";
import { useEffect } from "react";
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
