

// const express = require("express");
// const cors = require("cors");
//// require("dotenv").config(); const axios = require("axios");
// const OpenAI = require("openai");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const client = new OpenAI({
//     baseURL: "https://openrouter.ai/api/v1",
//     apiKey: process.env.OPENROUTER_API_KEY,
// });

// /*
//     TEST ROUTE
// */
// app.get("/test-llm", async (req, res) => {
//     try {
//         const completion =
//             await client.chat.completions.create({
//                 model: "nex-agi/nex-n2-pro:free",
//                 messages: [
//                     {
//                         role: "user",
//                         content: "Say hello.",
//                     },
//                 ],
//             });

//         res.json({
//             reply:
//                 completion.choices[0].message.content,
//         });
//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             error: error.message,
//         });
//     }
// });

// /*
//     MAIN CHAT ROUTE
// */
// app.post("/chat", async (req, res) => {
//     try {
//         const { message } = req.body;

//         if (!message) {
//             return res.status(400).json({
//                 error: "Message is required",
//             });
//         }

//         const tools = [
//             {
//                 type: "function",
//                 function: {
//                     name: "getBooks",
//                     description:
//                         "Get available books from the campus library.",
//                     parameters: {
//                         type: "object",
//                         properties: {},
//                     },
//                 },
//             },
//             {
//                 type: "function",
//                 function: {
//                     name: "getEvents",
//                     description:
//                         "Get upcoming campus events.",
//                     parameters: {
//                         type: "object",
//                         properties: {},
//                     },
//                 },
//             },
//             {
//                 type: "function",
//                 function: {
//                     name: "getMenu",
//                     description:
//                         "Get today's cafeteria menu.",
//                     parameters: {
//                         type: "object",
//                         properties: {},
//                     },
//                 },
//             },
//         ];

//         /*
//             Ask LLM which tool to call
//         */

//         const completion =
//             await client.chat.completions.create({
//                model: "openai/gpt-oss-20b:free",
//                 messages: [
//                     {
//                         role: "system",
//                         content: `
// You are Campus AI.

// You have access to the following tools:
// - getBooks: retrieve library books
// - getEvents: retrieve campus events
// - getMenu: retrieve cafeteria menu

// Use tools whenever the user's question requires campus information.
// If a tool is needed, call the appropriate tool.
// Do not make up campus data.
// `
//                     },
//                     {
//                         role: "user",
//                         content: message,
//                     },
//                 ],

//                 tools,
//             });

       
//             const toolCall =
//     completion.choices[0].message.tool_calls || [];

//         /*
//             If LLM wants a tool
//         */

//         if (toolCall) {
//             const toolName =
//                 toolCall.function.name;

//             let toolResult;

//             if (toolName === "getBooks") {
//                 const response =
//                     await axios.get(
//                         "http://localhost:5001/books"
//                     );

//                 toolResult = response.data;
//             }

//             else if (toolName === "getEvents") {
//                 const response =
//                     await axios.get(
//                         "http://localhost:5002/events"
//                     );

//                 toolResult = response.data;
//             }

//             else if (toolName === "getMenu") {
//                 const response =
//                     await axios.get(
//                         "http://localhost:5003/menu"
//                     );

//                 toolResult = response.data;
//             }

//             const finalCompletion =
//                 await client.chat.completions.create({
//                  model: "openai/gpt-oss-20b:free",

//                     messages: [
//                         {
//                             role: "system",
//                           content: `
// You are Campus Intelligence AI.

// You are a friendly campus assistant who explains data in a natural, human way like a senior student helping juniors.

// ---

// GOAL:
// Turn campus data into short, clear, conversational answers.

// ---

// STRICT RULES:
// - Never show raw JSON or tool data
// - Never use long reports or heavy formatting
// - Avoid big bullet lists
// - Keep responses short and natural
// - No unnecessary spacing or blank lines
// - No repetitive sections

// ---

// STYLE:
// - Friendly and conversational
// - Like explaining to a friend
// - Simple sentences
// - Light emojis only for section headers

// ---

// HOW TO RESPOND:

// 📚 Library:
// Talk normally:
// Mention what’s available and what’s not in 1–3 lines max

// 🎉 Events:
// Explain upcoming events like a short update

// 🍽 Cafeteria:
// Describe today’s menu like a quick suggestion

// ---

// INSIGHTS:
// - Only 1–2 small natural observations
// - No "INSIGHT:" label
// - Example:
//   "Operating Systems books are getting picked up quickly lately."
//   "You’re good on programming books for now."

// ---

// IMPORTANT:
// Keep everything compact, friendly, and human-like.
// `

//                         },

//                         {
//                             role: "user",
//                             content: message
//                         },

//                         completion.choices[0].message,

//                         {
//                             role: "tool",
//                             tool_call_id: toolCall.id,
//                             content: JSON.stringify(
//                                 toolResult
//                             )
//                         }
//                     ]
//                 });

//             return res.json({
//                 reply:
//                     finalCompletion
//                         .choices[0]
//                         .message.content
//             });
//         }

//         /*
//             General conversation
//         */

//         return res.json({
//             reply:
//                 completion.choices[0].message.content,
//         });

//     } catch (error) {
//         console.error(
//             "AI Server Error:",
//             error.response?.data ||
//             error.message
//         );

//         res.status(500).json({
//             error:
//                 "Something went wrong while processing your request.",
//         });
//     }
// });

// app.listen(5000, () => {
//     console.log(
//         "🤖 AI Server running on port 5000"
//     );
// });

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const OpenAI = require("openai");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const client = new OpenAI({
//     baseURL: "https://openrouter.ai/api/v1",
//     apiKey: process.env.OPENROUTER_API_KEY,
// });

// /*
//     TEST ROUTE
// */
// app.get("/test-llm", async (req, res) => {
//     try {
//         const completion = await client.chat.completions.create({
//             model: "nex-agi/nex-n2-pro:free",
//             messages: [
//                 { role: "user", content: "Say hello." }
//             ],
//         });

//         res.json({
//             reply: completion.choices[0].message.content,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// /*
//     MAIN CHAT ROUTE
// */
// app.post("/chat", async (req, res) => {
//     try {
//         const { message } = req.body;

//         if (!message) {
//             return res.status(400).json({
//                 error: "Message is required",
//             });
//         }

//         // ---------------------------
//         // TOOLS (MCP SERVERS)
//         // ---------------------------
//         const tools = [
//             {
//                 type: "function",
//                 function: {
//                     name: "getBooks",
//                     description: "Get available books from library",
//                     parameters: { type: "object", properties: {} },
//                 },
//             },
//             {
//                 type: "function",
//                 function: {
//                     name: "getEvents",
//                     description: "Get campus events",
//                     parameters: { type: "object", properties: {} },
//                 },
//             },
//             {
//                 type: "function",
//                 function: {
//                     name: "getMenu",
//                     description: "Get cafeteria menu",
//                     parameters: { type: "object", properties: {} },
//                 },
//             },
//         ];

//         // ---------------------------
//         // STEP 1: TOOL SELECTION LLM
//         // ---------------------------
//         const completion = await client.chat.completions.create({
//             model: "openai/gpt-oss-20b:free",

//             messages: [
//                 {
//                     role: "system",
//                     content: `
// You are Campus AI Tool Router.

// Decide which tools are needed.
// You MAY call multiple tools if required.
// Only call tools when needed.
// `,
//                 },
//                 {
//                     role: "user",
//                     content: message,
//                 },
//             ],

//             tools,
//         });

//         const toolCalls =
//             completion.choices[0].message.tool_calls || [];

//         // ---------------------------
//         // NO TOOL CASE
//         // ---------------------------
//         if (toolCalls.length === 0) {
//             return res.json({
//                 reply: completion.choices[0].message.content,
//                 toolsUsed: [],
//             });
//         }

//         // ---------------------------
//         // STEP 2: RUN MCP CALLS (PARALLEL)
//         // ---------------------------
//         const toolResults = await Promise.all(
//             toolCalls.map(async (toolCall) => {
//                 const name = toolCall.function.name;

//                 if (name === "getBooks") {
//                     const res = await axios.get("http://localhost:5001/books");
//                     return { tool: name, data: res.data };
//                 }

//                 if (name === "getEvents") {
//                     const res = await axios.get("http://localhost:5002/events");
//                     return { tool: name, data: res.data };
//                 }

//                 if (name === "getMenu") {
//                     const res = await axios.get("http://localhost:5003/menu");
//                     return { tool: name, data: res.data };
//                 }

//                 return null;
//             })
//         );

//         // ---------------------------
//         // STEP 3: FINAL INTELLIGENCE LLM
//         // ---------------------------
//         const finalCompletion = await client.chat.completions.create({
//             model: "openai/gpt-oss-20b:free",

//             messages: [
//                 {
//                     role: "system",
//                     content: `
// You are Campus Intelligence AI.

// You are a friendly student assistant.

// Your job:
// - Combine multiple campus data sources
// - Explain them in simple natural language
// - Be conversational like a senior helping juniors
// - Do NOT show JSON or raw data
// - Keep response short and clean

// STYLE:
// - Friendly tone
// - Simple sentences
// - Light emojis only for sections
// - 1–2 insights max
// `,
//                 },
//                 {
//                     role: "user",
//                     content: message,
//                 },
//                 {
//                     role: "assistant",
//                     content: "Here are MCP tool results:",
//                 },
//                 {
//                     role: "assistant",
//                     content: JSON.stringify(toolResults),
//                 },
//             ],
//         });

//         // ---------------------------
//         // RESPONSE
//         // ---------------------------
//         return res.json({
//             reply: finalCompletion.choices[0].message.content,
//             toolsUsed: toolResults,
//         });

//     } catch (error) {
//         console.error("AI Server Error:", error.response?.data || error.message);

//         return res.status(500).json({
//             error: "Something went wrong while processing your request.",
//         });
//     }
// });

// /*
//     START SERVER
// */
// app.listen(5000, () => {
//     console.log("🤖 AI Server running on port 5000");
// });

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const OpenAI = require("openai");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const client = new OpenAI({
//     baseURL: "https://openrouter.ai/api/v1",
//     apiKey: process.env.OPENROUTER_API_KEY,
// });

// /*
//     TEST ROUTE
// */
// app.get("/test-llm", async (req, res) => {
//     try {
//         const completion = await client.chat.completions.create({
//             model: "nex-agi/nex-n2-pro:free",
//             messages: [
//                 { role: "user", content: "Say hello." }
//             ],
//         });

//         res.json({
//             reply: completion.choices[0].message.content,
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// /*
//     MAIN CHAT ROUTE
// */
// app.post("/chat", async (req, res) => {
//     try {
//         const { message } = req.body;

//         if (!message) {
//             return res.status(400).json({
//                 error: "Message is required",
//             });
//         }

//         // ---------------------------
//         // TOOLS (MCP SERVERS)
//         // ---------------------------
//         const tools = [
//             {
//                 type: "function",
//                 function: {
//                     name: "getBooks",
//                     description: "Get available books from library",
//                     parameters: { type: "object", properties: {} },
//                 },
//             },
//             {
//                 type: "function",
//                 function: {
//                     name: "getEvents",
//                     description: "Get campus events",
//                     parameters: { type: "object", properties: {} },
//                 },
//             },
//             {
//                 type: "function",
//                 function: {
//                     name: "getMenu",
//                     description: "Get cafeteria menu",
//                     parameters: { type: "object", properties: {} },
//                 },
//             },
//         ];

//         // ---------------------------
//         // STEP 1: TOOL SELECTION LLM
//         // ---------------------------
//         const completion = await client.chat.completions.create({
//             model: "openai/gpt-oss-20b:free",

//             messages: [
//                 {
//                     role: "system",
//                     content: `
// You are Campus AI Tool Router.

// Decide which tools are needed.
// You MAY call multiple tools if required.
// Only call tools when needed.
// `,
//                 },
//                 {
//                     role: "user",
//                     content: message,
//                 },
//             ],

//             tools,
//         });

//         const toolCalls =
//             completion.choices[0].message.tool_calls || [];

//         // ---------------------------
//         // NO TOOL CASE
//         // ---------------------------
//         if (toolCalls.length === 0) {
//             return res.json({
//                 reply: completion.choices[0].message.content,
//                 toolsUsed: [],
//             });
//         }

//         // ---------------------------
//         // STEP 2: RUN MCP CALLS (PARALLEL)
//         // ---------------------------
//         const toolResults = await Promise.all(
//             toolCalls.map(async (toolCall) => {
//                 const name = toolCall.function.name;

//                 if (name === "getBooks") {
//                     const res = await axios.get("http://localhost:5001/books");
//                     return { tool: name, data: res.data };
//                 }

//                 if (name === "getEvents") {
//                     const res = await axios.get("http://localhost:5002/events");
//                     return { tool: name, data: res.data };
//                 }

//                 if (name === "getMenu") {
//                     const res = await axios.get("http://localhost:5003/menu");
//                     return { tool: name, data: res.data };
//                 }

//                 return null;
//             })
//         );

//         // ---------------------------
//         // STEP 3: FINAL INTELLIGENCE LLM
//         // ---------------------------
       
//         const finalCompletion = await client.chat.completions.create({
//   model: "openai/gpt-oss-20b:free",
//   messages: [
//     {
//       role: "system",
//       content: `You are Campus Intelligence AI.

// You are a friendly student assistant.

// Your job:
// - Combine multiple campus data sources
// - Explain them in simple natural language
// - Be conversational like a senior helping juniors
// - Do NOT show JSON or raw data
// - Keep response short and clean

// STYLE:
// - Friendly tone
// - Simple sentences
// - Light emojis only for sections
// - 1–2 insights max`
//     },
//     {
//       role: "user",
//       content: message,
//     },
//     {
//       role: "tool",
//       content: JSON.stringify(toolResults),
//     },
//   ],
// });

//         // ---------------------------
//         // RESPONSE
//         // ---------------------------
//         return res.json({
//             reply: finalCompletion.choices[0].message.content,
//             toolsUsed: toolResults,
//         });

//     } catch (error) {
//         console.error("AI Server Error:", error.response?.data || error.message);

//         return res.status(500).json({
//             error: "Something went wrong while processing your request.",
//         });
//     }
// });

// /*
//     START SERVER
// */
// app.listen(5000, () => {
//     console.log("🤖 AI Server running on port 5000");


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
    const router = await client.chat.completions.create({
     model:"openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "You are a tool router. Decide which campus tools are needed. Use multiple tools if required.",
        },
        { role: "user", content: message },
      ],
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
            `http://localhost:5001/books${searchQuery}`,
            name
          );
        }

        if (name === "getEvents") {
          return safeFetch("http://localhost:5002/events", name);
        }

        if (name === "getMenu") {
          return safeFetch("http://localhost:5003/menu", name);
        }

        return { tool: name, error: "Unknown tool" };
      })
    );

    /**
     * STEP 3: FINAL LLM (INTELLIGENCE LAYER)
     */
    const toolContext = formatToolContext(toolResults);

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
- If data missing, say so simply
      `.trim(),
    },
    { role: "user", content: message },
    ...toolResults.map((r, i) => ({
      role: "tool",
      tool_call_id: toolCalls[i].id,
      content: JSON.stringify(r),
    })),
  ],
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