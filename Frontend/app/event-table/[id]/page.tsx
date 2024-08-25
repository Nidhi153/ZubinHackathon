"use client";

import styles from "./EventTable.module.scss";
import BreadCrumbContainer from "../../components/Breadcrumb/BreadcrumbContainer";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
const dummyParticipants = [
  {
    userID: "1",
    name: "John Doe",
    phone: "12345678",
  },
  {
    userID: "2",
    name: "Jane Brown",
    phone: "98765432",
  },
  {
    userID: "3",
    name: "Peter Smith",
    phone: "45678901",
  },
];

const EventTable = ({ params }: { params: { id: string } }) => {
  const [registeredMembers, setRegisteredMembers] = useState([]);
  const [isTakingAttendance, setIsTakingAttendance] = useState(false);
  const [startedCamera, setStartedCamera] = useState(false);
  const [curEvent, setCurEvent] = useState<any>(null);
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
  useEffect(() => {
    let init = async () => {
      const res = await fetch("/api/events/getEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: params.id }),
      });

      const data = await res.json();
      console.log(data);

      if (data.event) {
        setCurEvent(data.event[0]);
        let membersIds = [];
        if (data.event[0].registered_volunteers) {
          let volunteerIds = data.event[0].registered_volunteers;
          membersIds = [...membersIds, ...volunteerIds];
        }
        if (data.event[0].registered_users) {
          let userIds = data.event[0].registered_users;
          membersIds = [...membersIds, ...userIds];
        }
        let volunteers = [];
        for (let i = 0; i < membersIds.length; i++) {
          console.log(membersIds[i]);
          const res = await fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: membersIds[i] }),
          });
          let data = await res.json();
          if (data.status === 404) {
            continue;
          }
          volunteers.push(data.user);
        }
        console.log(volunteers);
        setRegisteredMembers([...registeredMembers, ...volunteers]);
      }
    };
    init();
  }, []);
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  return (
    <div className={styles.body}>
      <BreadCrumbContainer
        role={"admin"}
        eventName={curEvent?.title || "Event"}
        eventLink={curEvent ? `/event/${curEvent._id}` : "/"}
      />
      <div className={styles.heading}>
        {curEvent?.title || "Loading title.."}
      </div>
      <span>{formatDate(Date.now())}</span>
      <TableContainer className={styles.table}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>Name</Th>
              <Th>Phone Number</Th>
            </Tr>
          </Thead>
          <Tbody>
            {registeredMembers.map((person, i) => (
              <Tr key={person._id}>
                <Td>{i}</Td>
                <Td>{person.name}</Td>
                <Td>{person.phoneno}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <div className={styles.buttonWrapper}>
        <Button onClick={() => setIsTakingAttendance(!isTakingAttendance)}>
          {isTakingAttendance ? "Stop Attendance" : "Start Attendance"}
        </Button>
        <Button>Download Data</Button>
        <Button>Print Data</Button>
      </div>
      {curEvent &&
        curEvent.attendees &&
        curEvent.attendees.map((attendee) => {
          return <div>{attendee}</div>;
        })}
    </div>
  );
};

export default EventTable;
