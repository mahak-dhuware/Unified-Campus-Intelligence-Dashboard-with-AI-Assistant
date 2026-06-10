import axios from "axios";

export const sendMessage = async (message) => {
    const response = await axios.post(
        "http://localhost:5000/chat",
        { message }
    );

    return response.data;
};