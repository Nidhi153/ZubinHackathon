"use client";
import { Button, FloatingLabel } from "flowbite-react";
import { useState, useEffect } from "react";
import "./auth.css";
export default function Signup({ setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let signup = async () => {
    let response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log(data);
    if (data.loggedIn) {
      setUserId(data.userId);
    }
  };

  return (
    <div className="container">
      <h1>Signup</h1>

      <FloatingLabel
        variant="outlined"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FloatingLabel
        variant="outlined"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={() => signup()}>Signup</Button>
    </div>
  );
}
