"use client";
import { Button, FloatingLabel } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./auth.css";

export default function Signup({ setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  let signup = async () => {
    let response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    const userId = data.userId;
    const role = data.role;
    if (!userId) {
      const message = data.message;
      if (message) {
        alert(message);
      } else {
        alert("Invalid email or password");
      }
      return;
    }
    if (!role) {
      alert("Role not found");
      return;
    }
    console.log(role);
    document.cookie = `userId=${userId};  path=/`;
    document.cookie = `role=${role}; path=/`;
    router.push("/");
  };

  return (
    <div className="container">
      <h1>Login</h1>

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

      <Button color="warning" onClick={() => signup()}>
        Login
      </Button>
    </div>
  );
}
