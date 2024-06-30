import React, { useState } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const StyledInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  font-size: 14px;
  color: white;
  background: transparent;

  &::placeholder {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "20px",
        borderTop: "1px solid #ccc",
        background: "#4d4d4d",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          borderRadius: "10px",
          overflow: "hidden",
          paddingRight: "5px",
          background: "#333333",
        }}
      >
        <StyledInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything!"
        />
        <Button
          onClick={handleSend}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "10px",
          }}
        >
          <SendIcon style={{ color: "white" }} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
