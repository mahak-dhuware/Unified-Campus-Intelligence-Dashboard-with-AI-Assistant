

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
     "model": "openai/gpt-4o",
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
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    /**
     * STEP 1: TOOL ROUTER LLM
     */
    /**
 * STEP 1: TOOL ROUTER LLM
 * With Fallback
 */
let router;

try {
  router = await client.chat.completions.create({
    model: "openrouter/free",
    messages: [
      {
        role: "system",
        content:
          "You are a tool router. Decide which campus tools are needed. Use multiple tools if required.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    tools,
    max_tokens: 150,
  });
} catch (err) {
  console.error("Router Model Error:", err.message);

  try {
    // Fallback LLM if router model fails
    const fallback = await client.chat.completions.create({
      model: "qwen/qwen-2.5-7b-instruct",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful campus assistant. Answer naturally.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 250,
    });

    return res.json({
      reply:
        fallback.choices?.[0]?.message?.content ||
        "I'm unable to process your request right now.",
      toolsUsed: [],
    });
  } catch (fallbackErr) {
    console.error("Fallback Model Error:", fallbackErr.message);

    return res.status(500).json({
      reply:
        "I'm currently unable to process your request. Please try again later.",
      toolsUsed: [],
    });
  }
}

const toolCalls = router.choices?.[0]?.message?.tool_calls || [];

/**
 * NO TOOL NEEDED
 */
if (toolCalls.length === 0) {
  return res.json({
    reply:
      router.choices?.[0]?.message?.content ||
      "I couldn't find any relevant information.",
    toolsUsed: [],
  });
}

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
            `https://unified-campus-intelligence-dashboard-h3nz.onrender.com/books${searchQuery}`,
            name
          );
        }

        if (name === "getEvents") {
          return safeFetch("https://unified-campus-intelligence-dashboard-n2b6.onrender.com/events", name);
        }

        if (name === "getMenu") {
          return safeFetch(" https://unified-campus-intelligence-dashboard-sedd.onrender.com/menu", name);
        }

        return { tool: name, error: "Unknown tool" };
      })
    );

    /**
     * STEP 3: FINAL LLM (INTELLIGENCE LAYER)
     */
   /**
 * STEP 3: FINAL LLM (INTELLIGENCE LAYER)
 */
/**
 * STEP 3: FINAL LLM (INTELLIGENCE LAYER)
 */
/**
 * STEP 3: FINAL LLM (INTELLIGENCE LAYER)
 */
const toolContext = formatToolContext(toolResults);

let finalReply = "";

try {
  const finalResponse = await client.chat.completions.create({
    model: "qwen/qwen-2.5-7b-instruct",
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
- If data is unavailable, say so politely

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

  finalReply =
    finalResponse.choices?.[0]?.message?.content ||
    "I couldn't generate a response.";
} catch (err) {
  console.error("Final LLM Error:", err.message);

  try {
    // Backup model
    const backupResponse = await client.chat.completions.create({
      model: "meta-llama/llama-3.2-3b-instruct:free",
      messages: [
        {
          role: "system",
          content: `Tool Results:\n${toolContext}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 250,
    });

    finalReply =
      backupResponse.choices?.[0]?.message?.content ||
      "I couldn't generate a response.";
  } catch (backupErr) {
    console.error("Backup LLM Error:", backupErr.message);

    const successfulTools = toolResults.filter((t) => !t.error);

    if (successfulTools.length > 0) {
      finalReply =
        "I found some information, but I'm unable to generate a detailed response right now.";
    } else {
      finalReply =
        "I'm currently unable to retrieve the requested information. Please try again later.";
    }
  }
}

return res.json({
  reply: finalReply,
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