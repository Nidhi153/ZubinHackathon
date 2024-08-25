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
  const handleSendMessage = async () => {
    if (curInput.trim() !== "") {
      let newHistory = [...history, { text: curInput, from: "user" }];
      setHistory([newHistory]);
      setCurInput("");
      // let response = "This is a response from the bot.";
      let response = await fetch("/api/ai/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: curInput }),
      });
      response = await response.json();
      console.log(response);
      let responseText = await response.text;
      // let responseTitle = await response.title;
      // let msg = `title: ${responseTitle}, text: ${responseText}`;
      newHistory = [...newHistory, { text: responseText, from: "bot" }];
      setHistory(newHistory);
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
          <button onClick={() => handleSendMessage()}>
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
          AI Chatbot
        </button>
      )}
    </div>
  );
};

export default ChatbotContainer;
