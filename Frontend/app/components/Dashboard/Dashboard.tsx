"use client";
import CreateEvent from "./CreateEvent";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CentralisedMessages from "./CentralisedMessages";
export default function Dashboard() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const userId = Cookies.get("userId");
    console.log("userid", userId);
    setUserId(userId);
  }, []);
  return (
    <div>
      <CreateEvent userId={userId}></CreateEvent>
      <CentralisedMessages></CentralisedMessages>
    </div>
  );
}
