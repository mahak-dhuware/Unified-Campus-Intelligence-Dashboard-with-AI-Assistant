import { useState } from "react";
import ChatBox from "./components/ChatBox";
import MessageBubble from "./components/MessageBubble";
import QuickActions from "./components/QuickActions";
import { sendMessage as sendToAI } from "./services/api";

function App() {
    const [messages, setMessages] = useState([]);

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        // User message
        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text,
            },
        ]);

        try {
            const response = await sendToAI(text);

            let replyText = "";

            if (Array.isArray(response.reply)) {
                replyText = response.reply
                    .map((item) => {
                        if (item.title) {
                            return `📚 ${item.title} - ${
                                item.available
                                    ? "Available"
                                    : "Unavailable"
                            }`;
                        }

                        if (item.name) {
                            return `🎉 ${item.name} (${item.date})`;
                        }

                        return JSON.stringify(item);
                    })
                    .join("\n");
            } else if (
                typeof response.reply === "object" &&
                response.reply !== null
            ) {
                replyText = Object.entries(response.reply)
                    .map(
                        ([key, value]) =>
                            `🍽 ${key}: ${value}`
                    )
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
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text: "❌ Something went wrong.",
                },
            ]);
        }
    };

    return (
        <div style={styles.container}>
            <h1>🎓 Campus AI Assistant</h1>
            <p>Ask anything about your campus.</p>

            <QuickActions sendMessage={sendMessage} />

            <div style={styles.chatArea}>
                {messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        sender={msg.sender}
                        text={msg.text}
                    />
                ))}
            </div>

            <ChatBox sendMessage={sendMessage} />
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial",
    },

    chatArea: {
        minHeight: "400px",
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "12px",
        marginTop: "20px",
        marginBottom: "20px",
        overflowY: "auto",
    },
};

export default App;