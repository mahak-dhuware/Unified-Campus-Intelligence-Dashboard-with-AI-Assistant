

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * OpenRouter Client
 */
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * ---------------------------
 * MCP TOOL REGISTRY
 * ---------------------------
 */
const tools = [
  {
    type: "function",
    function: {
      name: "getBooks",
      description: "Get available books from library",
      parameters: {
        type: "object",
        properties: {
          search: { type: "string" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getEvents",
      description: "Get campus events",
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
      description: "Get cafeteria menu",
      parameters: {
        type: "object",
        properties: {},
      },
    },
  },
];

const allowedTools = new Set(["getBooks", "getEvents", "getMenu"]);

/**
 * ---------------------------
 * SAFE MCP CALL
 * ---------------------------
 */
async function safeFetch(url, tool) {
  try {
    const res = await axios.get(url, { timeout: 4000 });
    return { tool, data: res.data };
  } catch (err) {
    return {
      tool,
      error: "Service unavailable or timeout",
    };
  }
}

/**
 * Format tool results for LLM
 */
function formatToolContext(results) {
  return results
    .map((r) => {
      if (r.error) return `${r.tool}: ERROR (${r.error})`;
      return `${r.tool}: ${JSON.stringify(r.data)}`;
    })
    .join("\n");
}

/**
 * ---------------------------
 * TEST ROUTE
 * ---------------------------
 */

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "Unified Campus Intelligence AI Server",
  });
});
app.get("/test-llm", async (req, res) => {
  try {
    const completion = await client.chat.completions.create({
    "model": "openai/gpt-oss-20b:free",
    max_tokens: 100,
      messages: [{ role: "user", content: "Say hello." }],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * ---------------------------
 * MAIN CHAT ROUTE
 * ---------------------------
 */
app.post("/chat", async (req, res) => {
    console.log("📨 /chat called");
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    /**
     * STEP 1: TOOL ROUTER LLM
     */
    const router = await client.chat.completions.create({
     model:"openai/gpt-oss-20b:free",
      messages: [
        {
          role: "system",
          content:
            "You are a tool router. Decide which campus tools are needed. Use multiple tools if required.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 150,
      tools,
    });

    const toolCalls = router.choices[0].message.tool_calls || [];

    /**
     * NO TOOL CASE
     */
    if (toolCalls.length === 0) {
      return res.json({
        reply: router.choices[0].message.content,
        toolsUsed: [],
      });
    }

    /**
     * STEP 2: EXECUTE MCP CALLS
     */
    const toolResults = await Promise.all(
      toolCalls.map(async (toolCall) => {
        const name = toolCall.function.name;

        if (!allowedTools.has(name)) {
          return { tool: name, error: "Not allowed tool" };
        }

        let args = {};
        try {
          args = JSON.parse(toolCall.function.arguments || "{}");
        } catch (e) {
          args = {};
        }

        if (name === "getBooks") {
          const searchQuery = args.search
            ? `?search=${args.search}`
            : "";
          return safeFetch(
             `${process.env.LIBRARY_URL}/books${searchQuery}`,
            name
          );
        }

        if (name === "getEvents") {
          return safeFetch(`${process.env.EVENTS_URL}/events`, name);
        }

        if (name === "getMenu") {
          return safeFetch(`${process.env.CAFETERIA_URL}/menu`, name);
        }

        return { tool: name, error: "Unknown tool" };
      })
    );

    /**
     * STEP 3: FINAL LLM (INTELLIGENCE LAYER)
     */
    const toolContext = formatToolContext(toolResults);

   const finalResponse = await client.chat.completions.create({
  model: "openai/gpt-oss-20b:free",
  messages: [
    {
      role: "system",
      content: `
You are Campus Intelligence AI.

Rules:
- Be conversational and helpful
- Use tool data naturally
- Do NOT show JSON
- Keep response short (1–5 lines)
- If data missing, say so simply

Tool Results:
${toolContext}
      `.trim(),
    },
    {
      role: "user",
      content: message,
    },
  ],
  max_tokens: 250,
});

    return res.json({
      reply: finalResponse.choices[0].message.content,
      toolsUsed: toolResults,
    });
  } catch (error) {
    console.error("AI Server Error:", error?.response?.data || error.message);

    return res.status(500).json({
      error: "Something went wrong while processing your request.",
    });
  }
});

/**
 * ---------------------------
 * START SERVER
 * ---------------------------
 */
app.listen(5000, () => {
  console.log("🤖 AI Server running on port 5000");
});