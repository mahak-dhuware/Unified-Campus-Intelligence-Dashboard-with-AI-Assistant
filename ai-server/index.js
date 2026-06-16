

// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");
// const OpenAI = require("openai");

// const app = express();

// app.use(cors());
// app.use(express.json());

// /**
//  * OpenRouter Client
//  */
// const client = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// /**
//  * ---------------------------
//  * MCP TOOL REGISTRY
//  * ---------------------------
//  */
// const tools = [
//   {
//     type: "function",
//     function: {
//       name: "getBooks",
//       description: "Get available books from library",
//       parameters: {
//         type: "object",
//         properties: {
//           search: { type: "string" },
//         },
//       },
//     },
//   },
//   {
//     type: "function",
//     function: {
//       name: "getEvents",
//       description: "Get campus events",
//       parameters: {
//         type: "object",
//         properties: {},
//       },
//     },
//   },
//   {
//     type: "function",
//     function: {
//       name: "getMenu",
//       description: "Get cafeteria menu",
//       parameters: {
//         type: "object",
//         properties: {},
//       },
//     },
//   },
// ];

// const allowedTools = new Set(["getBooks", "getEvents", "getMenu"]);

// /**
//  * ---------------------------
//  * SAFE MCP CALL
//  * ---------------------------
//  */
// async function safeFetch(url, tool) {
//   try {
//     const res = await axios.get(url, { timeout: 4000 });
//     return { tool, data: res.data };
//   } catch (err) {
//     return {
//       tool,
//       error: "Service unavailable or timeout",
//     };
//   }
// }

// /**
//  * Format tool results for LLM
//  */
// function formatToolContext(results) {
//   return results
//     .map((r) => {
//       if (r.error) return `${r.tool}: ERROR (${r.error})`;
//       return `${r.tool}: ${JSON.stringify(r.data)}`;
//     })
//     .join("\n");
// }

// /**
//  * ---------------------------
//  * TEST ROUTE
//  * ---------------------------
//  */

// app.get("/", (req, res) => {
//   res.json({
//     status: "OK",
//     service: "Unified Campus Intelligence AI Server",
//   });
// });
// app.get("/test-llm", async (req, res) => {
//   try {
//     const completion = await client.chat.completions.create({
//     "model": "openai/gpt-4o-mini",
//     max_tokens: 100,
//       messages: [{ role: "user", content: "Say hello." }],
//     });

//     res.json({
//       reply: completion.choices[0].message.content,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// /**
//  * ---------------------------
//  * MAIN CHAT ROUTE
//  * ---------------------------
//  */
// app.post("/chat", async (req, res) => {
//   process.on("unhandledRejection", (err) => {
//   console.error("🔥 UNHANDLED REJECTION:", err);
// });

// process.on("uncaughtException", (err) => {
//   console.error("🔥 UNCAUGHT EXCEPTION:", err);
// });
//     console.log("📨 /chat called");
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     /**
//      * STEP 1: TOOL ROUTER LLM
//      */


//     let router;

// try {
//   console.log("🧠 Calling router LLM");

//   router = await client.chat.completions.create({
//     model: "openai/gpt-oss-20b:free",
//     messages: [
//       { role: "system", content: "Tool router" },
//       { role: "user", content: message },
//     ],
//     tools,
//   });

//   console.log("✅ Router response received");
// } catch (err) {
//   console.error("❌ Router FAILED:", err?.response?.data || err.message);
//   return res.status(500).json({ error: "Router failed", detail: err.message });
// }
// const toolCalls =
//   router?.choices?.[0]?.message?.tool_calls ?? [];

//     /**
//      * NO TOOL CASE
//      */
//     if (toolCalls.length === 0) {
//       return res.json({
//         reply: router.choices[0].message.content,
//         toolsUsed: [],
//       });
//     }

//     /**
//      * STEP 2: EXECUTE MCP CALLS
//      */
//     const toolResults = await Promise.all(
//       toolCalls.map(async (toolCall) => {
//         const name = toolCall.function.name;

//         if (!allowedTools.has(name)) {
//           return { tool: name, error: "Not allowed tool" };
//         }

//         let args = {};
//         try {
//           args = JSON.parse(toolCall.function.arguments || "{}");
//         } catch (e) {
//           args = {};
//         }

//         if (name === "getBooks") {
//           const searchQuery = args.search
//             ? `?search=${args.search}`
//             : "";
//           return safeFetch(
//              `${process.env.LIBRARY_URL}${searchQuery}`,
//             name
//           );
//         }

//         if (name === "getEvents") {
//           return safeFetch(`${process.env.EVENTS_URL}`, name);
//         }

//         if (name === "getMenu") {
//           return safeFetch(`${process.env.CAFETERIA_URL}`, name);
//         }

//         return { tool: name, error: "Unknown tool" };
//       })
//     );

//     /**
//      * STEP 3: FINAL LLM (INTELLIGENCE LAYER)
//      */
//     const toolContext = formatToolContext(toolResults);

//    const finalResponse = await client.chat.completions.create({
//   model: "openai/gpt-4o-mini",
//   messages: [
//     {
//       role: "system",
//       content: `
// You are Campus Intelligence AI.

// Rules:
// - Be conversational and helpful
// - Use tool data naturally
// - Do NOT show JSON
// - Keep response short (1–5 lines)
// - If data missing, say so simply

// Tool Results:
// ${toolContext}
//       `.trim(),
//     },
//     {
//       role: "user",
//       content: message,
//     },
//   ],
//   max_tokens: 250,
// });

//     return res.json({
//       reply: finalResponse.choices[0].message.content,
//       toolsUsed: toolResults,
//     });
//   } catch (error) {
//     console.error("AI Server Error:", error?.response?.data || error.message);

//     return res.status(500).json({
//       error: "Something went wrong while processing your request.",
//     });
//   }
// });

// /**
//  * ---------------------------
//  * START SERVER
//  * ---------------------------
//  */
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("AI server running");
// });

// // require("dotenv").config();

// // const express = require("express");
// // const cors = require("cors");
// // const axios = require("axios");
// // const OpenAI = require("openai");

// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // /**
// //  * ENV CHECK (IMPORTANT)
// //  */
// // const requiredEnv = ["OPENROUTER_API_KEY", "LIBRARY_URL", "EVENTS_URL", "CAFETERIA_URL"];

// // for (const key of requiredEnv) {
// //   if (!process.env[key]) {
// //     console.warn(`⚠️ Missing ENV: ${key}`);
// //   }
// // }

// // /**
// //  * OpenRouter Client
// //  */
// // const client = new OpenAI({
// //   baseURL: "https://openrouter.ai/api/v1",
// //   apiKey: process.env.OPENROUTER_API_KEY,
// // });

// // /**
// //  * TOOL REGISTRY
// //  */
// // const tools = [
// //   {
// //     type: "function",
// //     function: {
// //       name: "getBooks",
// //       description: "Get available books from library",
// //       parameters: {
// //         type: "object",
// //         properties: {
// //           search: { type: "string" },
// //         },
// //         required: [],
// //       },
// //     },
// //   },
// //   {
// //     type: "function",
// //     function: {
// //       name: "getEvents",
// //       description: "Get campus events",
// //       parameters: {
// //         type: "object",
// //         properties: {},
// //         required: [],
// //       },
// //     },
// //   },
// //   {
// //     type: "function",
// //     function: {
// //       name: "getMenu",
// //       description: "Get cafeteria menu",
// //       parameters: {
// //         type: "object",
// //         properties: {},
// //         required: [],
// //       },
// //     },
// //   },
// // ];

// // const allowedTools = new Set(["getBooks", "getEvents", "getMenu"]);

// // /**
// //  * SAFE FETCH
// //  */
// // async function safeFetch(url, tool) {
// //   try {
// //     if (!url) throw new Error("Missing URL");

// //     const res = await axios.get(url, { timeout: 5000 });

// //     return { tool, data: res.data };
// //   } catch (err) {
// //     return {
// //       tool,
// //       error: err.message,
// //     };
// //   }
// // }

// // /**
// //  * FORMAT TOOL DATA
// //  */
// // function formatToolContext(results) {
// //   return results
// //     .map((r) => {
// //       if (r.error) return `${r.tool}: ERROR (${r.error})`;
// //       return `${r.tool}: ${JSON.stringify(r.data).slice(0, 800)}`;
// //     })
// //     .join("\n");
// // }

// // /**
// //  * HEALTH CHECK
// //  */
// // app.get("/", (req, res) => {
// //   res.json({ status: "OK", service: "Campus AI Server" });
// // });

// // /**
// //  * TEST LLM
// //  */
// // app.get("/test-llm", async (req, res) => {
// //   try {
// //     const completion = await client.chat.completions.create({
// //       model: "openai/gpt-4o-mini",
// //       messages: [{ role: "user", content: "Say hello" }],
// //     });

// //     res.json({
// //       reply: completion?.choices?.[0]?.message?.content,
// //     });
// //   } catch (err) {
// //     res.status(500).json({
// //       error: err.message,
// //     });
// //   }
// // });

// // /**
// //  * CHAT ROUTE (FIXED)
// //  */
// // app.post("/chat", async (req, res) => {
// //   console.log("🔥 /chat HIT");

// //   try {
// //     const { message } = req.body;

// //     if (!message) {
// //       return res.status(400).json({ error: "Message required" });
// //     }

// //     /**
// //      * STEP 1: ROUTER LLM
// //      */
// //     let router;

// //     try {
// //       console.log("🧠 Calling router...");

// //       router = await client.chat.completions.create({
// //         model: "openai/gpt-4o-mini",
// //         messages: [
// //           { role: "system", content: "Decide which tools are needed." },
// //           { role: "user", content: message },
// //         ],
// //         tools,
// //       });

// //       console.log("✅ Router success");
// //     } catch (err) {
// //   console.error("❌ ROUTER ERROR FULL:", err);
// //   console.error("❌ ROUTER RESPONSE:", err?.response?.data);

// //   return res.status(500).json({
// //     error: "Router failed",
// //     detail: err?.message,
// //   });
// // }

// //     const toolCalls =
// //       router?.choices?.[0]?.message?.tool_calls ?? [];

// //     /**
// //      * NO TOOL CASE
// //      */
// //     if (toolCalls.length === 0) {
// //       return res.json({
// //         reply: router?.choices?.[0]?.message?.content || "No response",
// //         toolsUsed: [],
// //       });
// //     }

// //     /**
// //      * STEP 2: EXECUTE TOOLS
// //      */
// //     const toolResults = await Promise.all(
// //       toolCalls.map(async (toolCall) => {
// //         const name = toolCall.function.name;

// //         if (!allowedTools.has(name)) {
// //           return { tool: name, error: "Not allowed" };
// //         }

// //         let args = {};
// //         try {
// //           args = JSON.parse(toolCall.function.arguments || "{}");
// //         } catch {
// //           args = {};
// //         }

// //         // if (name === "getBooks") {
// //         //   return safeFetch(
// //         //     `${process.env.LIBRARY_URL}?search=${args.search || ""}`,
// //         //     name
// //         //   );
// //         // }
// //         if (name === "getBooks") {
// //   console.log("📚 Library URL:", process.env.LIBRARY_URL/books);
// // }

// //         if (name === "getEvents") {
// //           return safeFetch(process.env.EVENTS_URL/events, name);
// //         }

// //         if (name === "getMenu") {
// //           return safeFetch(process.env.CAFETERIA_URL/menu, name);
// //         }

// //         return { tool: name, error: "Unknown tool" };
// //       })
// //     );

// //     /**
// //      * STEP 3: FINAL LLM
// //      */
// //     const toolContext = formatToolContext(toolResults);

// //     const finalResponse = await client.chat.completions.create({
// //       model: "openai/gpt-4o-mini",
// //       messages: [
// //         {
// //           role: "system",
// //           content: `
// // You are a campus assistant.

// // Use tool data naturally.
// // Be short (1–5 lines).
// // If missing data, say so.

// // Tool Data:
// // ${toolContext}
// //           `.trim(),
// //         },
// //         { role: "user", content: message },
// //       ],
// //       max_tokens: 250,
// //     });

// //     return res.json({
// //       reply:
// //         finalResponse?.choices?.[0]?.message?.content ||
// //         "No response generated",
// //       toolsUsed: toolResults,
// //     });
// //   } catch (err) {
// //     console.error("🔥 GLOBAL ERROR:", err.message);

// //     return res.status(500).json({
// //       error: "Server crashed safely",
// //       detail: err.message,
// //     });
// //   }
// // });

// // /**
// //  * START SERVER
// //  */
// // const PORT = process.env.PORT || 5000;

// // app.listen(PORT, () => {
// //   console.log("🚀 AI server running on port", PORT);
// // });




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

/* ---------------- TOOL REGISTRY ---------------- */

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

const allowedTools = new Set([
  "getBooks",
  "getEvents",
  "getMenu",
]);

/* ---------------- SAFE FETCH ---------------- */

async function safeFetch(url, tool) {
  try {
    const res = await axios.get(url, {
      timeout: 30000,
    });

    return {
      tool,
      data: res.data,
    };
  } catch (err) {
    console.error(`${tool} error:`, err.message);

    return {
      tool,
      error: err.message,
    };
  }
}

/* ---------------- HEALTH ---------------- */

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "Campus AI",
  });
});

/* ---------------- TEST LLM ---------------- */

app.get("/test-llm", async (req, res) => {
  try {
    const completion =
      await client.chat.completions.create({
        model: "qwen/qwen3-30b-a3b",
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
    res.status(500).json({
      error: error.message,
    });
  }
});

/* ---------------- CHAT ---------------- */

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    /* STEP 1: ROUTER */
/* STEP 1: ROUTER */

let assistantMessage = {
  role: "assistant",
  content: null,
};

let toolCalls = [];

try {
  console.log("🧠 Calling AI Router...");

  const router =
    await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "You are a campus tool router. Use tools whenever needed.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      tools,
      tool_choice: "auto",
      max_tokens: 150,
    });

  assistantMessage =
    router.choices[0].message;

  toolCalls =
    assistantMessage.tool_calls || [];

  console.log("✅ AI Router Success");
} catch (err) {
  console.log(
    "⚠️ AI Router failed. Using manual fallback."
  );

  const lower = message.toLowerCase();

  if (
    lower.includes("book") ||
    lower.includes("library")
  ) {
    toolCalls.push({
      id: "manual_books",
      function: {
        name: "getBooks",
        arguments: "{}",
      },
    });
  }

  if (
    lower.includes("event") ||
    lower.includes("upcoming") ||
    lower.includes("festival")
  ) {
    toolCalls.push({
      id: "manual_events",
      function: {
        name: "getEvents",
        arguments: "{}",
      },
    });
  }

  if (
    lower.includes("menu") ||
    lower.includes("food") ||
    lower.includes("cafeteria") ||
    lower.includes("meal")
  ) {
    toolCalls.push({
      id: "manual_menu",
      function: {
        name: "getMenu",
        arguments: "{}",
      },
    });
  }

  assistantMessage = {
    role: "assistant",
    content: null,
    tool_calls: toolCalls,
  };
}

console.log(
  "Tool Calls:",
  JSON.stringify(toolCalls, null, 2)
);
const failedTool =
  toolResults.find((r) => r.error);

if (failedTool) {
  return res.json({
    reply: `${failedTool.tool} service is currently unavailable. Please try again later.`,
    toolsUsed: toolResults,
  });
}

    /* STEP 2: EXECUTE TOOLS */

    const toolResults = await Promise.all(
      toolCalls.map(async (toolCall) => {
        const name =
          toolCall.function.name;

        if (!allowedTools.has(name)) {
          return {
            tool: name,
            error: "Not allowed tool",
          };
        }

        let args = {};

        try {
          args = JSON.parse(
            toolCall.function.arguments ||
              "{}"
          );
        } catch {
          args = {};
        }

        if (name === "getBooks") {
          const searchQuery =
            args.search
              ? `?search=${encodeURIComponent(
                  args.search
                )}`
              : "";

          return safeFetch(
            `https://unified-campus-intelligence-dashboard-h3nz.onrender.com/books${searchQuery}`,
            name
          );
        }

        if (name === "getEvents") {
          return safeFetch(
            "https://unified-campus-intelligence-dashboard-n2b6.onrender.com/events",
            name
          );
        }

        if (name === "getMenu") {
          return safeFetch(
            "https://unified-campus-intelligence-dashboard-sedd.onrender.com/menu",
            name
          );
        }

        return {
          tool: name,
          error: "Unknown tool",
        };
      })
    );

    console.log(
      "Tool Results:",
      JSON.stringify(toolResults, null, 2)
    );
    if (toolCalls.length === 0) {
  return res.json({
    reply:
      "I can help with books, events, and cafeteria services.",
    toolsUsed: [],
  });
}

    /* STEP 3: FINAL RESPONSE */

   const finalResponse =
  await client.chat.completions.create({
    model: "qwen/qwen3-30b-a3b",

        messages: [
          {
            role: "system",
            content: `
You are Campus Intelligence AI.

Rules:
- Be conversational.
- Use tool results naturally.
- Do not show JSON.
- Keep replies short (1-5 lines).
- If a tool failed, explain simply.
            `.trim(),
          },

          {
            role: "user",
            content: message,
          },

          assistantMessage,

          ...toolResults.map(
            (result, index) => ({
              role: "tool",
              tool_call_id:
                toolCalls[index].id,
              content: JSON.stringify(
                result
              ),
            })
          ),
        ],

        max_tokens: 250,
      });

    return res.json({
      reply:
        finalResponse.choices[0].message
          .content,
      toolsUsed: toolResults,
    });
  } catch (error) {
    console.error(
      "AI Server Error:",
      error.response?.data ||
        error.message
    );

    return res.status(500).json({
      error:
        "Something went wrong while processing your request.",
    });
  }
});

/* ---------------- START ---------------- */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 AI server running on port ${PORT}`
  );
});