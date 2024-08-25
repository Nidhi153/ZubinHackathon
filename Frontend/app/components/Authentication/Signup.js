"use client";
import { FloatingLabel } from "flowbite-react";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import "./auth.css";
import { useRouter } from "next/navigation";
import InputGroup from "../InputGroup/InputGroup";
import styles from './styles.module.scss'
import Link from "next/link";

export default function Signup({ setUserId }) {
  const [values, setValues] = useState([])
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
    // router.push("/protected");
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
            // <FloatingLabel
            //   variant="outlined"
            //   label={field.label}
            //   type={field.type}
            //   placeholder={field.placeholder}
            //   name={field.id}
            // />
          );
        })}

        {/* <Button onClick={() => signup()}>Signup</Button> */}
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
