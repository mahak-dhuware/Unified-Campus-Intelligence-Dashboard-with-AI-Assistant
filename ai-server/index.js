require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        let reply = "";

        if (message.toLowerCase().includes("book")) {
            const response = await axios.get(
                "http://localhost:5001/books"
            );

            reply = response.data;
        }

        else if (message.toLowerCase().includes("event")) {
            const response = await axios.get(
                "http://localhost:5002/events"
            );

            reply = response.data;
        }

        else if (
            message.toLowerCase().includes("food") ||
            message.toLowerCase().includes("menu") ||
            message.toLowerCase().includes("lunch")
        ) {
            const response = await axios.get(
                "http://localhost:5003/menu"
            );

            reply = response.data;
        }

        else {
            reply =
                "I can currently help with books, events, and cafeteria information.";
        }

        res.json({ reply });
    }

    catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong",
        });
    }
});

app.listen(5000, () => {
    console.log("🤖 AI Server running on port 5000");
});