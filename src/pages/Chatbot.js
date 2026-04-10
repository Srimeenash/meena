import React, { useState } from "react";
import styles from "../App.module.css";



function Chatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { side: "left", text: "Lorem ipsum dolor sit amet consectetur. Pulvinar nulla nunc senectus eget interdum tincidunt etiam..." },
    { side: "right", text: "This bid is possible to win" },
  ]);

  const handleAsk = () => {
    if (!input.trim()) return;
    setMessages([...messages, { side: "right", text: input }]);
    setInput("");
  };

  return (
    <div className={styles.chatContainer}>
      {/* Header */}
      <div className={styles.chatHeader}>
        <h2>ChatBot AI</h2>
      </div>

      {/* Messages Section */}
      <div className={styles.messages}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`${styles.message} ${msg.side === "left" ? styles.left : styles.right}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
        />
        <button onClick={handleAsk}>Ask Question</button>
      </div>
    </div>
  );
}
export default Chatbot;