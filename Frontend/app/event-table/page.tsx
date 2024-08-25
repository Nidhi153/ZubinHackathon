'use client'

import styles from './EventTable.module.scss'
import BreadCrumbContainer from '../components/Breadcrumb/BreadcrumbContainer'
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
  } from '@chakra-ui/react'
import Button from '../components/Button/Button'
import { useEffect, useState } from "react";

const dummyParticipants = [
    {
        userID: '1',
        name: 'John Doe',
        phone: '12345678',
    },
    {
        userID: '2',
        name: 'Jane Brown',
        phone: '98765432',
    },
    {
        userID: '3',
        name: 'Peter Smith',
        phone: '45678901',
    },
]

const EventTable = () => {
    const [highlightedRows, setHighlightedRows] = useState([]);

    const handleRowClick = (userID) => {
        setHighlightedRows((prev) => 
            prev.includes(userID) ? prev.filter(id => id !== userID) : [...prev, userID]
        );
    };

    return (
        <div className={styles.body}>
            <BreadCrumbContainer role='admin' eventName='Gathering Event' eventLink='/event-details' />
            <div className={styles.heading}>Gathering Event</div>
            <span>10/09/2024</span>
            <TableContainer className={styles.table}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Index</Th>
                            <Th>Name</Th>
                            <Th>Phone Number</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dummyParticipants.map((person, i) => (
                            <Tr key={person.userID} className={highlightedRows.includes(person.userID) ? styles.highlightedRow : ''} onClick={() => handleRowClick(person.userID)}>
                                <Td>{i}</Td>
                                <Td>{person.name}</Td>
                                <Td>{person.phone}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <div className={styles.buttonWrapper}>
                <Button>Download Data</Button>
                <Button>Print Data</Button>
                {/* <Button onClick={() => setIsTakingAttendance(!isTakingAttendance)}>{isTakingAttendance ? "Stop Attendance" : "Start Attendance"}</Button> */}
            </div>
          {/* {attendees.map((attendee) => {
              return <div>{attendee}</div>;
            })} */}
        </div>
    )
}

export default EventTable
