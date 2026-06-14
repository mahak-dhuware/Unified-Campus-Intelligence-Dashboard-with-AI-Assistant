require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

/*
    TEST ROUTE
*/
app.get("/test-llm", async (req, res) => {
    try {
        const completion =
            await client.chat.completions.create({
                model: "nex-agi/nex-n2-pro:free",
                messages: [
                    {
                        role: "user",
                        content: "Say hello.",
                    },
                ],
            });

        res.json({
            reply:
                completion.choices[0].message.content,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message,
        });
    }
});

/*
    MAIN CHAT ROUTE
*/
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Message is required",
            });
        }

        const tools = [
            {
                type: "function",
                function: {
                    name: "getBooks",
                    description:
                        "Get available books from the campus library.",
                    parameters: {
                        type: "object",
                        properties: {},
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "getEvents",
                    description:
                        "Get upcoming campus events.",
                    parameters: {
                        type: "object",
                        properties: {},
                    },
                },
            },
            {
                type: "function",
                function: {
                    name: "getMenu",
                    description:
                        "Get today's cafeteria menu.",
                    parameters: {
                        type: "object",
                        properties: {},
                    },
                },
            },
        ];

        /*
            Ask LLM which tool to call
        */

        const completion =
            await client.chat.completions.create({
                model: "nex-agi/nex-n2-pro:free",

                messages: [
                    {
                        role: "system",
                        content:
                            "You are Campus AI. Use available tools whenever needed to answer questions.",
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],

                tools,
            });

        const toolCall =
            completion.choices[0].message.tool_calls?.[0];

        /*
            If LLM wants a tool
        */

        if (toolCall) {
            const toolName =
                toolCall.function.name;

            let reply;

            /*
                Library MCP
            */

            if (toolName === "getBooks") {
                const response =
                    await axios.get(
                        "http://localhost:5001/books"
                    );

                reply = response.data;
            }

            /*
                Events MCP
            */

            else if (toolName === "getEvents") {
                const response =
                    await axios.get(
                        "http://localhost:5002/events"
                    );

                reply = response.data;
            }

            /*
                Cafeteria MCP
            */

            else if (toolName === "getMenu") {
                const response =
                    await axios.get(
                        "http://localhost:5003/menu"
                    );

                reply = response.data;
            }

            return res.json({ reply });
        }

        /*
            General conversation
        */

        return res.json({
            reply:
                completion.choices[0].message.content,
        });

    } catch (error) {
        console.error(
            "AI Server Error:",
            error.response?.data ||
                error.message
        );

        res.status(500).json({
            error:
                "Something went wrong while processing your request.",
        });
    }
});

app.listen(5000, () => {
    console.log(
        "🤖 AI Server running on port 5000"
    );
});

