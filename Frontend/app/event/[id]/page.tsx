"use client";

import Image from "next/image";
import chatbotStyles from "../../chatbot/chatbotPage.module.scss";
import BreadCrumbContainer from "../../components/Breadcrumb/BreadcrumbContainer";
import Chatbot from "../../components/chatbot/Chatbot";
import styles from "./eventDetails.module.scss";
import posterImage from "../../assets/poster.png";
import Button from "../../components/Button/Button";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
/* Planning to migrate this to a type file */
const ALL_ROLES = ["volunteer", "admin", "member"] as const;
type Roles = (typeof ALL_ROLES)[number];

const EventDetails = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Roles>("member");
  const [curEvent, setCurEvent] = useState(null);
  const router = useRouter();

  /* Update the role whenever the link refreshes */
  useEffect(() => {
    let init = async () => {
      const eventId = params.id;

      console.log("eventId", eventId);
      const res = await fetch(`/api/events/getEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: eventId }),
      });

      const event = await res.json();
      if (event) {
        setCurEvent(event.event[0]);
      }
      const role = Cookies.get("role");
      // const role = searchParams.get("role");
      if (role && ALL_ROLES.includes(role as Roles)) {
        setRole(role as Roles);
        console.log("role is " + role);
      }
    };
    init();
  }, [searchParams]);

  const memberButtonOnClick = useCallback(() => {
    router.push("/event-registration");
  }, []);

  const volunteerButtonOnClick = useCallback(() => {
    router.push("/training-video");
  }, []);

  return (
    <div className={styles.body}>
      <BreadCrumbContainer
        role={role}
        eventName={curEvent?.title || "Event"}
        eventLink={curEvent ? `/event/${curEvent._id}` : "/"}
      />
      <div className={styles.heading}>
        {curEvent?.title || "Loading title.."}
      </div>
      <div>{curEvent?.date || "Loading date.."}</div>
      <Image src={posterImage} alt="Poster Image" height={260} />

      {/* Member and volunteer only */}
      {role !== "admin" ? (
        <div className={styles.horizontalButtonWrapper}>
          <Button onClick={memberButtonOnClick}>Register</Button>
          {role === "volunteer" ? (
            <Button background="brown" onClick={volunteerButtonOnClick}>
              Register as volunteer
            </Button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {role === "admin" ? (
        <div className={styles.verticalButtonWrapper}>
          <Button>See registration data</Button>
          <Button>Send message to participants</Button>
        </div>
      ) : (
        ""
      )}

      {/* Fixed on page, only show to volunteers and members */}
      {role !== "admin" ? (
        <div className={chatbotStyles.chatbotWrapper}>
          <Chatbot />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default EventDetails;
