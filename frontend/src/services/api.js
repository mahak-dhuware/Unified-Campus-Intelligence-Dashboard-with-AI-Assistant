// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL;

// export const sendMessage = async (message) => {
//   const response = await axios.post(`${BASE_URL}/chat`, {
//     message,
//   });

//   return response.data;
// };

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const sendMessage = async (message) => {
  const response = await axios.post(`${BASE_URL}/chat`, {
    message,
  });

  return response.data;
};