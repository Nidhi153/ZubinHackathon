"use client";
import { FloatingLabel } from "flowbite-react";
import { useState } from "react";
import "./auth.css";
import { useRouter } from "next/navigation";
import styles from './styles.module.scss'
import Button from "../Button/Button";
import InputGroup from "../InputGroup/InputGroup";
import Link from "next/link";

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
    // router.push("/protected");
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <InputGroup text="Email" placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
        <InputGroup text="Password" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
        {/* <FloatingLabel
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
        /> */}

        <Button onClick={() => signup()} type="submit">Login</Button>
      </form>
      <span>Don't have an account yet?{" "}
        <Link href="/signup">Sign up</Link>
      </span>
    </div>
  );
}
