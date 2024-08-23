import Chatbot from "./components/Chatbot/Chatbot"
import styles from './global.module.scss'
"use client";
import { useEffect, useState } from "react";
import Authentication from "./components/Authentication";
import Event from "./components/Event";
import Dashboard from "./components/Dashboard";

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
      <a href="/authentication/signup">Sign up</a>
      {showLogin && <Authentication setUserId={setUserId}></Authentication>}

      {userId && userId != "" && <Event userId={userId} />}
      {/* {isAdmin && <Dashboard />} */}
    </div>
  );
}
