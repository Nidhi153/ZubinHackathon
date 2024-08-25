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
    Select
  } from '@chakra-ui/react'

import buttonStyle from '../Button/Button.module.scss';
import inputStyle from '../InputGroup/InputGroup.module.scss';

import InputGroup from "../InputGroup/InputGroup"
import Button from "../Button/Button";

import { useRouter } from "next/navigation";
// import Button from "../components/Button/Button";
// import styles from "./account.module.scss";
import BadgeRow from "./Row/BadgeRow";
import TextRow from "./Row/TextRow";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import MemberFeedback from "./MemberFeedback"
const CentralisedMessage = () => {
  const [messages, setMessages] = useState([]);
  const [responses, setResponses] = useState({});
  const [selectedTag, setSelectedTag] = useState('');
  useEffect(() => {
    let init = async () => {
      const data = await fetch("/api/whatsapp/messages");
      const messages = await data.json();
      setMessages(messages);
    };
    init();
  }, []);

  const handleInputChange = (id, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [id]: value
    }));
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const filteredMessages = selectedTag
  ? messages.filter((message) => message.categories.includes(selectedTag))
  : messages;
  let submitResponse = async (id, num, e) => {
    e.preventDefault();
    console.log("submitting response");
    console.log(responses[id]);
    // const message = e.target.message.value;
    const message = responses[id]
    const res = await fetch("/api/ai/whatsapp/broadcast", {
      method: "POST",
      body: JSON.stringify({
        phonenumbers: [num],
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
          <div className={styles.body}>
            <div className={styles.heading}>Member Feedback</div>
            <Select placeholder="Filter by tag" onChange={handleTagChange} value={selectedTag}>
              <option value="emergency">emergency</option>
              <option value="tag2">tag2</option>
              <option value="tag3">tag3</option>
            </Select>
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
                        {filteredMessages.map((message) => (
                       // {messages.map((message) => (
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
                                <form onSubmit={(e) => submitResponse(message._id, message.phonenumber, e)}>
                                  {/* <input type="text" placeholder="Response" name="message" className={inputStyle.inputGroup}></input> */}
                                  <InputGroup placeholder="Response" name="respond" value={responses[message._id] || ''} onChange={(e) => handleInputChange(message._id, e.target.value)}/>
                                  <br />
                                  <button className={buttonStyle.button}>Submit</button>
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
