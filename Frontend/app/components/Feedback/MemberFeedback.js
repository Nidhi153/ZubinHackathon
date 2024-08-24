'use client'

import styles from './EventTable.module.scss'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
  } from '@chakra-ui/react'

const dummyParticipants = [
    {
        userID: '1',
        name: 'John Doe',
        phone: '12345678',
        tag: 'Tag'
    },
    {
        userID: '2',
        name: 'Jane Brown',
        phone: '98765432',
        tag: 'Priority'
    },
    {
        userID: '3',
        name: 'Peter Smith',
        phone: '45678901',
        tag: 'Priority'
    },
]

const MemberFeedback = () => {
    return (
        <div className={styles.body}>
            <div className={styles.heading}>Member Feedback</div>
            <TableContainer className={styles.table}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Index</Th>
                            <Th>Name</Th>
                            <Th>Phone Number</Th>
                            <Th>Tag</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {dummyParticipants.map((person, i) => (
                            <Tr key={person.userID}>
                                <Td>{i}</Td>
                                <Td>{person.name}</Td>
                                <Td>{person.phone}</Td>
                                <Td>{person.tag}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default MemberFeedback