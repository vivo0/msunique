import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PaperHeader from "./PaperHeader";
import logo from "../../assets/logo.png";
import ChatArea from "./ChatArea.tsx";
import ChatInput from "./ChatInput.tsx";
import TypingAnimation from "./TypingAnimation";
import axios from "axios";
import { useFilterStore } from "../../store/useFilterStore.ts";

interface ChatBotDialogProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  className: string;
  color: string;
}

interface Message {
  text: string;
  sender: string;
}

const ChatBotDialog = ({ setOpen, className, color }: ChatBotDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const concatenatedArray = useFilterStore((state) => state.concatenatedArray);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setIsTyping(false);
      setMessages([
        {
          text: "Hi! I'm FAInalyst - Chatbot. How can I help you today?",
          sender: "bot",
        },
      ]);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  console.log(concatenatedArray);

  const handleSend = async (message: string) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:8000/chatbot", {
        query: message,
        company: concatenatedArray,
      });

      setIsTyping(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.response, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error fetching response from chatbot:", error);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Sorry, I encountered an error. Please try again later.",
            sender: "bot",
          },
        ]);
      }, 2000);
    }
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
