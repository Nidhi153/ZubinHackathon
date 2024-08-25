"use client";
import styles from "./Chatbot.module.scss";
import sendIcon from "../../assets/sendIcon.svg";
import Image from "next/image";
import Message from "./Message/Message";
import { useState } from "react";
const Chatbot = ({ setIsChatbotVisible }) => {
  return (
    <div
      className={styles.chatbot}
      onMouseLeave={() => setIsChatbotVisible(false)}
    >
      <div className={styles.header}>AI Chatbot</div>
      <div className={styles.body}>
        <div className={styles.messages}>
          <Message text="This is a very long message." from="bot" />
          <Message text="This is a very long message." from="user" />
          <Message text="Short message." from="bot" />
        </div>
        <div className={styles.inputBox}>
          <input className={styles.input} placeholder="Enter your message..." />
          <Image src={sendIcon} alt="Send Icon" />
        </div>
      </div>
    </div>
  );
};

const ChatbotContainer = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  return (
    <div className={styles.chatbotContainer}>
      {isChatbotVisible ? (
        <Chatbot setIsChatbotVisible={setIsChatbotVisible} />
      ) : (
        <button
          onMouseEnter={() => setIsChatbotVisible(true)}
          className="chatbotButton"
        >
          🤖 Chat
        </button>
      )}
    </div>
  );
};

export default ChatbotContainer;
