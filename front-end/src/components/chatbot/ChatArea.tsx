import React, { useEffect, useRef, useState } from "react";

interface Message {
  text: string;
  sender: string;
  id?: string;
}

interface ChatAreaProps {
  messages: Message[];
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages: propMessages }) => {
  const [messages, setMessages] = useState(propMessages);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedMessages = JSON.parse(
        localStorage.getItem("chatBotMessages") || "[]"
      );
      if (JSON.stringify(storedMessages) !== JSON.stringify(messages)) {
        setMessages(storedMessages);
      }
    }, 200);

    return () => clearInterval(intervalId);
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
            key={message.id || index}
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
              {message.text}
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
