"use client";
import styles from "./Chatbot.module.scss";
import sendIcon from "../../assets/sendIcon.svg";
import Image from "next/image";
import Message from "./Message/Message";
import { useState, useRef, useEffect } from "react";
const Chatbot = ({ setIsChatbotVisible, history, setHistory }) => {
  const [curInput, setCurInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSendMessage = () => {
    if (curInput.trim() !== "") {
      setHistory([...history, { text: curInput, from: "user" }]);
      setCurInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  return (
    <div
      className={styles.chatbot}
      onMouseLeave={() => setIsChatbotVisible(false)}
    >
      <div className={styles.header}>AI Chatbot</div>
      <div className={styles.body}>
        <div className={styles.messages}>
          {history.map((message, index) => (
            <Message key={index} text={message.text} from={message.from} />
          ))}
          <div ref={messagesEndRef} />
          {/* <Message text="This is a very long message." from="bot" />
          <Message text="This is a very long message." from="user" />
          <Message text="Short message." from="bot" /> */}
        </div>
        <div className={styles.inputBox}>
          <input
            className={styles.input}
            value={curInput}
            onChange={(e) => setCurInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your message..."
          />
          <button onClick={() => addMessage()}>
            <Image src={sendIcon} alt="Send Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatbotContainer = () => {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const [history, setHistory] = useState([]);
  return (
    <div className={styles.chatbotContainer}>
      {isChatbotVisible ? (
        <Chatbot
          setIsChatbotVisible={setIsChatbotVisible}
          history={history}
          setHistory={setHistory}
        />
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
