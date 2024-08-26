"use client";

import {
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import styles from "./EventTable.module.scss";
import { Badge } from "flowbite-react";
import buttonStyle from "../Button/Button.module.scss";
import InputGroup from "../InputGroup/InputGroup";
import { useEffect, useState } from "react";

const CentralisedMessage = () => {
  const [messages, setMessages] = useState([]);
  const [responses, setResponses] = useState({});
  const [selectedTag, setSelectedTag] = useState("");
  const allTags = [
    "Food",
    "Location",
    "Transport",
    "Emergency",
    "Feedback",
    "Volunteer",
    "Donation",
    "Jobs",
    "Training",
    "Education",
  ];

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await fetch("/api/whatsapp/messages");
      const messages = await data.json();
      setMessages(messages);
    };

    // Fetch messages immediately on mount
    fetchMessages();

    // Set up interval to fetch messages every 1 second
    const intervalId = setInterval(fetchMessages, 500);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (id, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [id]: value,
    }));
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const filteredMessages = selectedTag
    ? messages.filter((message) =>
        message.categories
          .map((category) => category.toLowerCase())
          .includes(selectedTag.toLowerCase())
      )
    : messages;
  let submitResponse = async (id, num, e) => {
    e.preventDefault();
    console.log("submitting response");
    console.log(responses[id]);
    const message = responses[id];
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
        <Select
          placeholder="Filter by Tag"
          onChange={handleTagChange}
          value={selectedTag}
          style={{ padding: "8px 15px" }}
        >
          {allTags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </Select>
        <TableContainer className={styles.table}>
          <Table variant="simple">
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
                <Tr key={message._id}>
                  <Td className={styles.indexColumn}>{message.id}</Td>
                  <Td
                    className={`${styles.messageCell} ${styles.messageColumn}`}
                  >
                    {message.message}
                  </Td>
                  <Td className={styles.phoneColumn}>{message.phonenumber}</Td>
                  <Td className={styles.tagColumn}>
                    {message.categories &&
                      message.categories.map(
                        (category: string, index: number) => (
                          <Badge
                            key={index}
                            color={
                              category.toLocaleLowerCase() == "emergency"
                                ? "red"
                                : "blue"
                            }
                            style={{ width: "100px", marginBottom: "10px" }}
                          >
                            {category}{" "}
                          </Badge>
                        )
                      )}
                  </Td>
                  <Td className={styles.replyColumn}>
                    <form
                      onSubmit={(e) =>
                        submitResponse(message._id, message.phonenumber, e)
                      }
                    >
                      <InputGroup
                        placeholder="Response"
                        name="respond"
                        value={responses[message._id] || ""}
                        onChange={(e) =>
                          handleInputChange(message._id, e.target.value)
                        }
                      />
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
    </div>
  );
};

export default CentralisedMessage;
