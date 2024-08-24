"use client";

import { useRouter } from "next/navigation";
import Button from "../components/Button/Button";
import styles from "./account.module.scss";
import BadgeRow from "./Row/BadgeRow";
import TextRow from "./Row/TextRow";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
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
      {messages.map((message) => (
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
      ))}
    </div>
  );
};

export default CentralisedMessage;
