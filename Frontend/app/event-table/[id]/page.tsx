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
        role="admin"
        eventName="Gathering Event"
        eventLink="/event-details"
      />
      <div className={styles.heading}>Gathering Event</div>
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
        <Button>Download Data</Button>
        <Button>Print Data</Button>
      </div>
    </div>
  );
};

export default EventTable;
