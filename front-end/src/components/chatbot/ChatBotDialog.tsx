import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaperHeader from "./PaperHeader";
import logo from "../../assets/logo.png";
import ChatArea from "./ChatArea.tsx";
import ChatInput from "./ChatInput.tsx";
import TypingAnimation from "./TypingAnimation";
import { useBackgroundProcess } from "../../hooks/useBackgroundProcess.ts";

interface ChatBotDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  className: string;
  color: string;
}

interface Message {
  text: string;
  sender: string;
  id?: string;
}

const ChatBotDialog = ({ setOpen, className, color }: ChatBotDialogProps) => {
  const [messages, setMessages] = useState<Message[]>(() =>
    JSON.parse(localStorage.getItem("chatBotMessages") || "[]")
  );
  const [isTyping, setIsTyping] = useState(false);
  const { addPendingRequest, pendingRequestsCount } = useBackgroundProcess();

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = {
        text: "Hi! I'm FAInalyst - Chatbot. How can I help you today?",
        sender: "bot",
      };
      setMessages([initialMessage]);
      localStorage.setItem("chatBotMessages", JSON.stringify([initialMessage]));
    }
  }, []);

  useEffect(() => {
    setIsTyping(pendingRequestsCount > 0);
  }, [pendingRequestsCount]);

  const handleSend = async (message: string) => {
    const userMessage = { text: message, sender: "user" };
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, userMessage];
      localStorage.setItem("chatBotMessages", JSON.stringify(newMessages));
      return newMessages;
    });

    addPendingRequest(message);
  };

  return (
    <Paper
      className={className}
      style={{
        borderRadius: "10px",
        position: "relative",
        minWidth: "500px",
        maxWidth: "500px",
      }}
    >
      <IconButton
        style={{
          position: "absolute",
          right: "10px",
          top: "10px",
          color: "#b3b3b3",
          zIndex: 10,
          borderRadius: "50%",
          padding: "1px",
        }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </IconButton>
      <PaperHeader logo={logo} color={color} />
      <div
        style={{
          backgroundColor: "#cccccc",
          paddingLeft: "10px",
        }}
      >
        <ChatArea messages={messages} />
        {isTyping && <TypingAnimation />}
      </div>
      <ChatInput onSend={handleSend} />
    </Paper>
  );
};

export default ChatBotDialog;
