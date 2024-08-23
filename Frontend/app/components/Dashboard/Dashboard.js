"use client";
import CreateEvent from "./CreateEvent";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
export default function Dashboard() {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const userId = Cookies.get("userId");
    console.log("userid", userId);
    setUserId(userId);
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>welcome {userId}</h1>
      <CreateEvent userId={userId}></CreateEvent>
    </div>
  );
}
