import { useState, useEffect } from "react";
import axios from "axios";
import { useFilterStore } from "../store/useFilterStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const useBackgroundProcess = () => {
  const [pendingRequests, setPendingRequests] = useState<
    Array<{ message: string; id: string }>
  >([]);
  const concatenatedArray = useFilterStore((state) => state.concatenatedArray);

  useEffect(() => {
    const processPendingRequests = async () => {
      if (pendingRequests.length > 0) {
        const [currentRequest, ...remainingRequests] = pendingRequests;
        try {
          const response = await axios.post(`${API_URL}/chatbot`, {
            query: currentRequest.message,
            company: concatenatedArray,
          });

          const messages = JSON.parse(
            localStorage.getItem("chatBotMessages") || "[]"
          );
          messages.push({
            text: response.data.response,
            sender: "bot",
            id: currentRequest.id,
          });
          localStorage.setItem("chatBotMessages", JSON.stringify(messages));

          setPendingRequests(remainingRequests);
        } catch (error) {
          console.error("Error processing request:", error);
        }
      }
    };

    processPendingRequests();
  }, [pendingRequests, concatenatedArray]);

  const addPendingRequest = (message: string) => {
    const id = Date.now().toString();
    setPendingRequests((prev) => [...prev, { message, id }]);
    return id;
  };

  return {
    addPendingRequest,
    pendingRequestsCount: pendingRequests.length,
  };
};
