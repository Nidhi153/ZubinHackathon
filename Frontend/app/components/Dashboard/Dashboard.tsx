"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CentralisedMessages from "./CentralisedMessages";
export default function Dashboard() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const userId = Cookies.get("userId");
    console.log("userid", userId);
    setUserId(userId!);
  }, []);
  return (
    <div>
      <CentralisedMessages></CentralisedMessages>
    </div>
  );
}
