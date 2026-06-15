import axios from "axios";

export const sendMessage = async (message) => {
    const BASE_URL = import.meta.env.VITE_API_URL;

export const sendMessage = async (message) => {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  return response.json();
};

    return response.data;
};