"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import posterImage from "../../assets/poster.png";
import BreadCrumbContainer from "../../components/Breadcrumb/BreadcrumbContainer";
import Button from "../../components/Button/Button";
import styles from "./eventDetails.module.scss";

/* Planning to migrate this to a type file */
const ALL_ROLES = ["volunteer", "admin", "member"] as const;
type Roles = (typeof ALL_ROLES)[number];

const EventDetails = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Roles>("member");
  const [curEvent, setCurEvent] = useState<any>(null);
  const [userEnrolledAs, setUserEnrolledAs] = useState<
    "not" | "member" | "volunteer"
  >("not");
  const router = useRouter();

  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const [startedCamera, setStartedCamera] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isTakingAttendance) {
        setStartedCamera(false);
        if (!startedCamera) return;
        await fetch("/api/stop");
        return;
      }

      if (!startedCamera) {
        console.log("Starting camera...");
        await fetch("/api/start");
        setStartedCamera(true);
      }

      const fetchData = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
          const response = await fetch("/api/data", {
            signal: controller.signal,
          });

          if (response.ok) {
            const data = await response.json();
            if ("current_data" in data) {
              if (data.current_data) {
                const res = await fetch("/api/events/updateAttendance", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    eventId: params.id,
                    email: data.current_data,
                  }),
                });
                const resData = await res.json();
                if (resData.added) {
                  const res = await fetch(`/api/events/getEvent`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id: params.id }),
                  });
                  const event = await res.json();
                  console.log(event.event);
                  setCurEvent(event.event[0]);
                }
              }
            } else {
              console.log("No data available");
            }
          } else {
            console.log("Failed to fetch data");
          }
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Request timed out");
          } else {
            console.log(`Error fetching data: ${error.message}`);
          }
        } finally {
          clearTimeout(timeoutId);
        }
      };

      await fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, [isTakingAttendance, startedCamera]);

  /* Update the role whenever the link refreshes */
  useEffect(() => {
    let init = async () => {
      const eventId = params.id;
      const userId = Cookies.get("userId");

      console.log("eventId", eventId);

      const res = await fetch(`/api/events/getEvent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: eventId }),
      });

      let event = await res.json();
      if (event) {
        event = event.event[0];

        console.log(event);
        setCurEvent(event);

        if (event.registered_users.includes(userId)) {
          setUserEnrolledAs("member");
        } else if (event.registered_volunteers.includes(userId)) {
          setUserEnrolledAs("volunteer");
        }
      }
      const role = Cookies.get("role");
      if (role) {
        setRole(role);
        console.log("role is " + role);
      }
    };
    init();
  }, [searchParams]);
  useEffect(() => {
    let init = async () => {
      await fetch("/api/events/deleteAllAttendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId: params.id }),
      });
    };
    init();
  }, []);
  const sendMessage = async () => {
    router.push(`/send-message/${params.id}`);
  };
  const memberButtonOnClick = () => {
    if (curEvent) {
      router.push("/event-registration/" + curEvent._id);
    }
  };

  const volunteerButtonOnClick = () => {
    if (curEvent) {
      router.push("/training-video/" + curEvent._id);
    }
  };

  const memberUnregisterButtonOnClick = async () => {
    // delete from registered_users and user's registered_events
    const userId = Cookies.get("userId");
    const eventId = params.id;

    // get the user info
    // post the user info without this event id in registered_events
    const res = await fetch("/api/events/unregister", {
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
      router.push("/successful-unregistration");
    } else {
      alert("Failed to unregister");
      router.push("/");
    }
    // redirect to successful-unregistration page
  };

  const volunteerUnregisterButtonOnClick = async () => {
    // delete from registered_volunteers and user's registered_events
    console.log("Unregistering as volunteer");
    const userId = Cookies.get("userId");
    const eventId = params.id;

    // get the user info
    // post the user info without this event id in registered_events
    const res = await fetch("/api/events/unregisterVolunteer", {
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
      router.push("/successful-unregistration");
    } else {
      alert("Failed to unregister");
      router.push("/");
    }
  };

  const Badge = ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <span
      onClick={onClick}
      style={{
        cursor: "pointer",
        margin: "5px",
        padding: "5px",
        borderRadius: "5px",
        backgroundColor: "#0ABAB5", // Tiffany Blue
        color: "white",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-5px)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {children}
    </span>
  );
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
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
      <div>{curEvent?.date ? formatDate(curEvent.date) : "Loading date.."}</div>
      {curEvent?.skills && (
        <div className="flex flex-wrap gap-2">
          {curEvent.skills.map((skill, index) => (
            <Badge key={index}>{skill}</Badge>
          ))}
        </div>
      )}
      <Image src={posterImage} alt="Poster Image" height={260} />

      {/* Unregistered member and volunteer only */}
      {role !== "admin" && userEnrolledAs == "not" ? (
        <div className={styles.horizontalButtonWrapper}>
          <Button onClick={() => memberButtonOnClick()}>Register</Button>
          {role === "volunteer" ? (
            <Button background="brown" onClick={() => volunteerButtonOnClick()}>
              Register as volunteer
            </Button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {/* Registered as member only */}
      {role !== "admin" && userEnrolledAs == "member" ? (
        <div className={styles.horizontalButtonWrapper}>
          <Button onClick={() => memberUnregisterButtonOnClick()}>
            Unregister
          </Button>
          {role === "volunteer" ? (
            <Button background="brown" onClick={() => volunteerButtonOnClick()}>
              Register as volunteer
            </Button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {/* Registered as volunteer only */}
      {role !== "admin" && userEnrolledAs == "volunteer" ? (
        <div className={styles.horizontalButtonWrapper}>
          <Button onClick={() => memberButtonOnClick()}>Register</Button>
          {role === "volunteer" ? (
            <Button
              background="brown"
              onClick={() => volunteerUnregisterButtonOnClick()}
            >
              Unregister as volunteer
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
          <Button
            onClick={() => {
              router.push(`/event-table/${params.id}`);
            }}
          >
            See registration data
          </Button>
          <Button
            onClick={() => {
              sendMessage();
            }}
          >
            Send message to participants
          </Button>
        </div>
      ) : (
        ""
      )}

      {/* Fixed on page, only show to volunteers and members */}
    </div>
  );
};

export default EventDetails;
