"use client";
import { Button, FloatingLabel } from "flowbite-react";
import { useState } from "react";
import "../auth.css";
export default function Page() {
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
    // if (response.ok) {
    //   window.location.href = "/dashboard";
    // } else {
    //   alert("Failed to signup");
    // }
    const data = await response.json();

    console.log(data);
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
      <p>
        If you already have an account, you can{" "}
        <a href="/authentication/login">login</a>
      </p>
    </div>
  );
}
