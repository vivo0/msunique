import React, { useEffect, useRef } from "react";
import Markdown from "react-markdown";

interface ChatAreaProps {
  messages: { text: string; sender: string }[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timer);
  }, [messages]);

  return (
    <div
      style={{
        padding: "0px 15px 5px 15px",
        overflowY: "auto",
        minHeight: "500px",
        maxHeight: "500px",
        borderRadius: "7px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flexGrow: 1, marginTop: "10px", overflowY: "auto" }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              textAlign: message.sender === "bot" ? "left" : "right",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px",
                marginRight: message.sender === "bot" ? "0px" : "15px",
                borderRadius: "10px",
                backgroundColor:
                  message.sender === "bot" ? "#363332" : "#0f7cf4",
                border: "1px solid #ccc",
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
                fontSize: "16px",
                color: "white",
              }}
            >
              <Markdown>{message.text}</Markdown>
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      ></div>
      <style>{`
                div::-webkit-scrollbar {
                    width: 5px;
                }

                div::-webkit-scrollbar-track {
                    background: #dedede;
                    border-radius: 10px;
                }

                div::-webkit-scrollbar-thumb {
                    background: #a7a7a7;
                    border-radius: 10px;
                }
            `}</style>
    </div>
  );
};

export default ChatArea;
