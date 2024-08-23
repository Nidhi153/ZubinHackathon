"use client";
import Chatbot from "./components/Chatbot/Chatbot";
import styles from "./global.module.scss";
import { useEffect, useState } from "react";
import Authentication from "./components/Authentication/Authentication";
import Event from "./components/Event/AllEvent";
import Dashboard from "./components/Dashboard/Dashboard";

export default function Home() {
  const [userId, setUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  useEffect(() => {
    console.log("userId", userId);
    if (userId) {
      setShowLogin(false);
    }
  }, [userId]);
  return (
    <div>
      {/* {showLogin && <Authentication setUserId={setUserId}></Authentication>} */}

      {<Event />}
      {isAdmin && <Dashboard />}
    </div>
  );
}
