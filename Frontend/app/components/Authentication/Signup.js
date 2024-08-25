"use client";
import { Button, FloatingLabel } from "flowbite-react";
import { useState, useEffect } from "react";
import "./auth.css";
import { useRouter } from "next/navigation";
export default function Signup({ setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const fields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      // placeholder: "Enter email",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      // placeholder: "Enter password",
    },
    {
      id: "phoneno",
      label: "Phone Number",
      type: "tel",
      // placeholder: "Enter phone number",
    },
    {
      id: "name",
      label: "Name",
      type: "text",
      // placeholder: "Enter name",
    },
  ];
  let signup = async (e) => {
    e.preventDefault();
    let user = {
      email: e.target.email.value,
      password: e.target.password.value,
      phoneno: e.target.phoneno.value,
      name: e.target.name.value,
    };
    console.log(user);
    let response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
    document.cookie = `userId=${userId};  path=/`;
    document.cookie = `role=${role}; path=/`;
    // router.push("/protected");
    router.push("/");
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={(e) => signup(e)}>
        {fields.map((field) => {
          return (
            <FloatingLabel
              variant="outlined"
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              name={field.id}
            />
          );
        })}

        {/* <Button onClick={() => signup()}>Signup</Button> */}
        <Button type="submit">Signup</Button>
      </form>
    </div>
  );
}
