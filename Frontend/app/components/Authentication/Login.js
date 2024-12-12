"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../Button/Button";
import InputGroup from "../InputGroup/InputGroup";
import "./auth.css";
import styles from './styles.module.scss';

export default function Signup() {
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
    <div className={styles.container}>
      <form className={styles.form}>
        <InputGroup text="Email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
        <InputGroup text="Password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" />
        <Button onClick={() => signup()}>Login</Button>
      </form>
      <span>Don't have an account yet?{" "}
        <Link href="/signup">Sign up</Link>
      </span>
    </div>
  );
}
