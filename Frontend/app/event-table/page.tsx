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
                            <Tr>
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
            </div>
        </div>
    )
}

export default EventTable
