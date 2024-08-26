"use client";
import { Button, Dropdown, FloatingLabel } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./auth.css";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("member");

  const handleSelect = (value) => {
    setSelectedRole(value);
  };
  const fields = [
    {
      id: "email",
      label: "Email",
      type: "email",
    },
    {
      id: "password",
      label: "Password",
      type: "password",
    },
    {
      id: "phoneno",
      label: "Phone Number",
      type: "tel",
    },
    {
      id: "name",
      label: "Name",
      type: "text",
    },
  ];
  let signup = async (e) => {
    e.preventDefault();
    let user = {
      email: e.target.email.value,
      password: e.target.password.value,
      phoneno: e.target.phoneno.value,
      name: e.target.name.value,
      role: selectedRole,
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
        <div style={{ marginBottom: "10px" }}>
          <Dropdown label={selectedRole || "Select role"}>
            <Dropdown.Item
              value="volunteer"
              onClick={() => handleSelect("volunteer")}
            >
              Volunteer
            </Dropdown.Item>
            <Dropdown.Item
              value="member"
              onClick={() => handleSelect("member")}
            >
              Member
            </Dropdown.Item>
          </Dropdown>
        </div>
        <Button color="warning" type="submit">
          Signup
        </Button>
      </form>
    </div>
  );
}
