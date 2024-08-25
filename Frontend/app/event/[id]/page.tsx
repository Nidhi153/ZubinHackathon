"use client";

import Image from "next/image";
import chatbotStyles from "../../chatbot/chatbotPage.module.scss";
import BreadCrumbContainer from "../../components/Breadcrumb/BreadcrumbContainer";
import Chatbot from "../../components/Chatbot/Chatbot";
import styles from "./eventDetails.module.scss";
import posterImage from "../../assets/poster.png";
import Button from "../../components/Button/Button";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { set, trusted } from "mongoose";
/* Planning to migrate this to a type file */
const ALL_ROLES = ["volunteer", "admin", "member"] as const;
type Roles = (typeof ALL_ROLES)[number];

const EventDetails = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<Roles>("member");
  const [curEvent, setCurEvent] = useState<any>(null);
  const [userEnrolledAs, setUserEnrolledAs] = useState<"not" | "member" | "volunteer">("not");
  const router = useRouter();

  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const [startedCamera, setStartedCamera] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!isTakingAttendance) {
        setStartedCamera(false);
        await fetch("/api/stop");
        return;
      }

      if (!startedCamera) {
        console.log("Starting camera...");

        await fetch("/api/start");
        // await fetch("http://localhost:2000/start", {
        //   mode: "no-cors",
        // });

        setStartedCamera(true);
        // console.log(response);
        // if (response.status === 200) {
        //   console.log("Camera started");

        // }
      }

      const fetchData = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        try {
          const response = await fetch("/api/data", {
            signal: controller.signal,
          });
          //   const response = await fetch("http://localhost:2000/data", {
          //     signal: controller.signal,
          //     mode: "no-cors",
          //   });

          if (response.ok) {
            const data = await response.json();
            if ("current_data" in data) {
              if (data.current_data) {
                // console.log(`Received QR Code data: ${data.current_data}`);
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

                  // const newEvent = {
                  //   ...curEvent,
                  //   attendees: [...curEvent.attendees, data.current_data],
                  // };
                  // setCurEvent(newEvent);
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

      //   if (startedCamera) await fetchData();
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

      const event = await res.json();
      if (event) {
        setCurEvent(event.event[0]);
        if (event.event[0].registered_users.includes(userId)) {
          setUserEnrolledAs("member");
        } 
        else if (event.event[0].volunteers.includes(userId)) {
          setUserEnrolledAs("volunteer");
        }
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
    // TODO: MARCUS DO THIS
    const userId = Cookies.get("userId");
    const eventId = params.id;

    // get the user info
    // post the user info without this event id in registered_events

    // get the event info
    // post the event info without this user id in registered_members


    // redirect to successful-unregistration page
    router.push("/successful-unregistration");
  }

  const volunteerUnregisterButtonOnClick = async () => {
    // delete from registered_volunteers and user's registered_events 
    // TODO: MARCUS DO THIS
    const userId = Cookies.get("userId");
    const eventId = params.id;

    // get the user info
    // post the user info without this event id in registered_events

    // get the event info
    // post the event info without this user id in registered_volunteers

    // redirect to successful-unregistration page
    router.push("/successful-unregistration");
  }

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


      {/* Unregistered member and volunteer only */}
      {(role !== "admin" && userEnrolledAs == "not") ? (
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
      {(role !== "admin" && userEnrolledAs == "member") ? (
        <div className={styles.horizontalButtonWrapper}>
          <Button onClick={() => memberUnregisterButtonOnClick()}>Unregister</Button>
          {role === "volunteer" ? (
            <Button background="brown" disabled={true} onClick={() => volunteerButtonOnClick()}>
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
      {(role !== "admin" && userEnrolledAs == "volunteer") ? (
        <div className={styles.horizontalButtonWrapper}>
          <Button disabled={true} onClick={() => memberButtonOnClick()}>Register</Button>
          {role === "volunteer" ? (
            <Button background="brown" disabled={true} onClick={() => volunteerUnregisterButtonOnClick()}>
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
          <Button>See registration data</Button>
          <Button>Send message to participants</Button>
          <button onClick={() => setIsTakingAttendance(!isTakingAttendance)}>
            {isTakingAttendance ? "Stop Attendance" : "Start Attendance"}
          </button>
          {curEvent &&
            curEvent.attendees &&
            curEvent.attendees.map((attendee) => {
              return <div>{attendee}</div>;
            })}
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
