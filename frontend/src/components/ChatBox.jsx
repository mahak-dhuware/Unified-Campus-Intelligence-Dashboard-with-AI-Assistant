import { useState } from "react";
import { sendMessage } from "../services/api";

function ChatBox({
    messages,
    setMessages,
}) {
    const [input, setInput] =
        useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        setMessages([
            ...messages,
            {
                sender: "user",
                text: input,
            },
        ]);

        const userInput = input;

        setInput("");

        const response = await sendMessage(userInput);

let replyText = "";

if (Array.isArray(response.reply)) {
    replyText = response.reply
        .map((item) => {
            if (item.title) {
                return `📚 ${item.title} - ${
                    item.available ? "Available" : "Unavailable"
                }`;
            }

            if (item.name) {
                return `🎉 ${item.name} (${item.date})`;
            }

            return JSON.stringify(item);
        })
        .join("\n");
} else if (typeof response.reply === "object") {
    replyText = Object.entries(response.reply)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
} else {
    replyText = response.reply;
}

setMessages((prev) => [
    ...prev,
    {
        sender: "assistant",
        text: replyText,
    },

        ]);
    };

    return (
        <div>
            <input
                value={input}
                onChange={(e) =>
                    setInput(
                        e.target.value
                    )
                }
                placeholder="Ask something..."
                style={{
                    width: "75%",
                    padding: "12px",
                }}
            />

            <button
                onClick={handleSend}
                style={{
                    padding: "12px",
                    marginLeft: "10px",
                }}
            >
                Send
            </button>
        </div>
    );
}

export default ChatBox;