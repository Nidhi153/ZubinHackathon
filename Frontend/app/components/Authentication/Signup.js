"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../Button/Button";
import InputGroup from "../InputGroup/InputGroup";
import "./auth.css";
import styles from './styles.module.scss';

export default function Signup() {
  const [values, setValues] = useState([])
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
      email: values[0],
      password: values[1],
      phoneno: values[2],
      name: values[3],
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
    <div className={styles.container}>
      <form onSubmit={(e) => signup(e)} className={styles.form}>
        {fields.map((field, i) => {
          return (
            <InputGroup
              text={field.label}
              placeholder={field.label}
              type={field.type}
              value={values[i]}
              onChange={(e) => {
                const newValue = e.target.value
                const newValues = [...values]
                newValues[i] = newValue
                setValues(newValues)
              }}
            />
          );
        })}

        <div className={styles.buttonWrapper}>
          <Button type="submit" onClick={() => signup()}>Signup</Button>
        </div>
      </form>
      <span>Already have an account?{" "}
        <Link href="/login">Log in</Link>
      </span>
    </div>
  );
}
