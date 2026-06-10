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

        if (!message) {
            return res.status(400).json({
                error: "Message is required",
            });
        }

        const lowerMessage = message.toLowerCase();

        let reply = "";

        // Library MCP Server
        if (
            lowerMessage.includes("book") ||
            lowerMessage.includes("library")
        ) {
            const response = await axios.get(
                "http://localhost:5001/books"
            );

            reply = response.data;
        }

        // Events MCP Server
        else if (
            lowerMessage.includes("event") ||
            lowerMessage.includes("workshop") ||
            lowerMessage.includes("hackathon") ||
            lowerMessage.includes("contest")
        ) {
            const response = await axios.get(
                "http://localhost:5002/events"
            );

            reply = response.data;
        }

        // Cafeteria MCP Server
        else if (
            lowerMessage.includes("food") ||
            lowerMessage.includes("menu") ||
            lowerMessage.includes("lunch") ||
            lowerMessage.includes("breakfast") ||
            lowerMessage.includes("dinner") ||
            lowerMessage.includes("cafeteria")
        ) {
            const response = await axios.get(
                "http://localhost:5003/menu"
            );

            reply = response.data;
        }

        // Unknown query
        else {
            reply =
                "I can currently help with:\n" +
                "📚 Library information\n" +
                "🎉 Campus events\n" +
                "🍽 Cafeteria menu\n\n" +
                "Try asking:\n" +
                "• What books are available?\n" +
                "• Any upcoming events?\n" +
                "• What's today's menu?";
        }

        res.json({ reply });

    } catch (error) {
        console.error("AI Server Error:", error.message);

        res.status(500).json({
            error: "Something went wrong while processing your request.",
        });
    }
});

app.listen(5000, () => {
    console.log("🤖 AI Server running on port 5000");
});