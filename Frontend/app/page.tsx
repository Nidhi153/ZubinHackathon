"use client";
import { useEffect, useState } from "react";
import Authentication from "./components/Authentication";
import Event from "./components/Event";

export default function Home() {
  const [userId, setUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    console.log("userId", userId);
    if (userId) {
      setShowLogin(false);
    }
  }, [userId]);
  return (
    <div>
      {showLogin && <Authentication setUserId={setUserId} />}

      {userId && userId != "" && <Event userId={userId} />}
    </div>
  );
}
