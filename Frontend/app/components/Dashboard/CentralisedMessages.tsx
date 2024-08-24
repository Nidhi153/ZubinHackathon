"use client";

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

import { useRouter } from "next/navigation";
import Button from "../components/Button/Button";
// import styles from "./account.module.scss";
import BadgeRow from "./Row/BadgeRow";
import TextRow from "./Row/TextRow";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import MemberFeedback from "./MemberFeedback"
const CentralisedMessage = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    let init = async () => {
      const data = await fetch("/api/whatsapp/messages");
      const messages = await data.json();
      setMessages(messages);
    };
    init();
  }, []);

  let submitResponse = async (id, e) => {
    e.preventDefault();
    console.log("submitting response");
    const message = e.target.message.value;
    const res = await fetch("/api/ai/whatsapp/broadcast", {
      method: "POST",
      body: JSON.stringify({
        phonenumbers: [id],
        broadcastmessage: message,
      }),
    });
    if (res.status === 200) {
      alert("Response submitted");
    } else {
      alert("Response failed to submit");
    }
  };

  return (
    <div>
      {/* {messages.map((message) => (
        <div key={message._id}>
          <div>{message.message}</div>
          <div>{message.phonenumber}</div>
          {message.categories &&
            message.categories.map((category) => <p>{category}</p>)}
          <form onSubmit={(e) => submitResponse(message.phonenumber, e)}>
            <input type="text" placeholder="response" name="message"></input>
            <button>Submit</button>
          </form>
        </div>
      ))} */}

          <div className={styles.body}>
            <div className={styles.heading}>Member Feedback</div>
            <TableContainer className={styles.table}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Index</Th>
                            <Th>Message</Th>
                            <Th>Phone Number</Th>
                            <Th>Tag</Th>
                            <Th>Reply</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {messages.map((message) => (
                            <Tr key={message._id}>
                                <Td className={styles.indexColumn}>{message.id}</Td>
                                <Td className={`${styles.messageCell} ${styles.messageColumn}`}>{message.message}</Td>
                                <Td className={styles.phoneColumn}>{message.phonenumber}</Td>
                                <Td className={styles.tagColumn}>
                                    {message.categories && message.categories.map((category, index) => (
                                        <span key={index}>
                                            {category}
                                            <br />
                                        </span>
                                    ))}
                                </Td>
                                <Td className={styles.replyColumn}>
                                <form onSubmit={(e) => submitResponse(message.phonenumber, e)}>
                                  <input type="text" placeholder="Response" name="message" style={{ width: '400px' }}></input>
                                  <br />
                                  <button className={styles.buttonWrapper}>Submit</button>
                                </form>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>

      {/* <MemberFeedback messages={messages}/> */}
    </div>
  );
};

export default CentralisedMessage;
