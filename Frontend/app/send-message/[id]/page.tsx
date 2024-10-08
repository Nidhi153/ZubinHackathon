"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BreadCrumbContainer from "../../components/Breadcrumb/BreadcrumbContainer";
import Button from "../../components/Button/Button";
import styles from "./sendMessage.module.scss";

// to create a form

/* Planning to migrate this to a type file */
const ALL_ROLES = ["volunteer", "admin", "member"] as const;
type Roles = (typeof ALL_ROLES)[number];
const contacts: string[] = ["+852 53273686"];

const EventDetails = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Roles>("admin");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Sending message:", message);
    const res = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        id: params.id,
        broadcastmessage: message,
      }),
    });
    const data = await res.json();
    if (data.status === 200) {
      alert("Message sent successfully");
    } else {
      alert("Message not sent");
    }
    router.push("/");
  };

  /* Update the role whenever the link refreshes */
  useEffect(() => {
    const role = searchParams.get("role");
    if (role && ALL_ROLES.includes(role as Roles)) {
      setRole(role as Roles);
      console.log("role is " + role);
    }
  }, [searchParams]);

  return (
    <div className={styles.body}>
      <BreadCrumbContainer
        role={role}
        eventName="Gathering Event"
        eventLink="/event-details/send-message"
      />
      <div className={styles.heading}>Gathering Event</div>
      <div>10/09/2024</div>

      {role === "admin" ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="message">Message:</label>
            <br />
            <textarea
              id="message"
              name="message"
              className={styles.messageBox}
              rows={4}
              cols={50}
              value={message}
              placeholder="Message"
              onChange={handleMessageChange}
            ></textarea>
            <br />
            <br />
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EventDetails;
