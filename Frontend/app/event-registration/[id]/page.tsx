"use client";

import BreadCrumbContainer from "../../components/Breadcrumb/BreadcrumbContainer";
import styles from "./eventRegistration.module.scss";
import InputGroup from "../../components/InputGroup/InputGroup";
import { useCallback, useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
interface formMetaDataEntry {
  text: string;
  inputType:
    | "text"
    | "checkbox"
    | "date"
    | "email"
    | "password"
    | "radio"
    | "time"
    | "tel";
}

const formMetaData: formMetaDataEntry[] = [
  {
    text: "Name",
    inputType: "text",
  },
  {
    text: "Phone number",
    inputType: "tel",
  },
];

const EventRegistration = ({ params }: { params: { id: string } }) => {
  const [values, setValues] = useState<string[]>([]);
  const router = useRouter();
  const [eventId, setEventId] = useState("");
  const [userId, setUserId] = useState("");
  const buttonOnClick = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/events/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: eventId,
        userId: userId,
      }),
    });
    if (res.status == 200) {
      router.push("/successful-registration");
    } else {
      alert("Failed to register");
      router.push("/");
    }
  };

  useEffect(() => {
    let init = async () => {
      const userId = Cookies.get("userId");
      if (!userId) {
        router.push("/login");
      }
      setUserId(userId!);
      if (!params.id) {
        router.push("/");
      }

      setEventId(params.id);
    };
    init();
  });
  return (
    <form className={styles.body} onClick={(e) => buttonOnClick(e)}>
      {/* <BreadCrumbContainer
        role="member"
        eventName="Gathering Event"
        eventLink="/event-details"
      /> */}
      {/* <h1>Gathering Event</h1> */}
      {formMetaData.map((entry, i) => (
        <InputGroup
          text={entry.text}
          placeholder={entry.text}
          value={values[i]}
          onChange={(e) => {
            const newValues = [...values];
            newValues[i] = e.target.value;
            setValues(newValues);
          }}
        />
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default EventRegistration;
