import chatBotImage from "../../assets/chatBotImage.png";
import { Button } from "@mui/material";
import ChatBotDialog from "./ChatBotDialog";
import { useEffect, useState } from "react";
import { getFromLocalStorage, saveToLocalStorage } from "../../utils/helpers";

interface ChatBotProps {
  color: string;
}

const ChatBot = ({ color }: ChatBotProps) => {
  const [open, setOpen] = useState<boolean>(() =>
    getFromLocalStorage("chatBotOpen", false)
  );
  const [animate, setAnimate] = useState<boolean>(false);
  const [closing, setClosing] = useState<boolean>(false);
  const [showInitialMessages, setShowInitialMessages] = useState<boolean>(() =>
    getFromLocalStorage("showInitialMessages", true)
  );
  const [initialMessageClosing, setInitialMessageClosing] =
    useState<boolean>(false);

  const handleOpen = () => {
    setShowInitialMessages(false);
    setAnimate(true);
    setOpen(true);
    saveToLocalStorage("chatBotOpen", true);
    saveToLocalStorage("showInitialMessages", false);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setAnimate(false);
      setClosing(false);
      saveToLocalStorage("chatBotOpen", false);
    }, 200);
  };

  useEffect(() => {
    if (showInitialMessages) {
      const timer = setTimeout(() => {
        setInitialMessageClosing(true);
        setTimeout(() => {
          setShowInitialMessages(false);
          saveToLocalStorage("showInitialMessages", false);
        }, 1000);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showInitialMessages]);

  return (
    <div className="chatBot-container">
      {showInitialMessages && (
        <div className="initial-messages">
          <div
            className={`initial-message ${
              initialMessageClosing ? "fade-out" : ""
            }`}
          >
            Welcome to F<span style={{ color: "#e33900" }}>AI</span>nalyst
            services.
          </div>
          <div
            className={`initial-message ${
              initialMessageClosing ? "fade-out" : ""
            }`}
          >
            Chat with your data!
          </div>
        </div>
      )}
      {!open && !closing && (
        <Button
          onClick={handleOpen}
          style={{
            borderRadius: "50%",
            padding: "10px",
            backgroundColor: color,
            width: "75px",
            height: "75px",
            border: "0.5px solid grey",
          }}
        >
          <img
            src={chatBotImage}
            alt="Chat Bot"
            style={{ objectFit: "contain", width: "50px" }}
          />
        </Button>
      )}
      {open && (
        <ChatBotDialog
          setOpen={handleClose}
          className={`chatBot-dialog ${
            animate && !closing ? "expand-enter" : closing ? "expand-exit" : ""
          }`}
          color={color}
        />
      )}
    </div>
  );
};

export default ChatBot;
