import { useState } from "react";

function ChatBox({ sendMessage }) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        sendMessage(input);
        setInput("");
    };
    const styles = {
        container: {
            display: "flex",
            gap: "12px",
            marginTop: "16px",
        },

        input: {
            flex: 1,
            padding: "14px 18px",
            borderRadius: "12px",
            border: "1px solid #CBD5E1",
            background: "#FFFFFF",
            fontSize: "15px",
            outline: "none",
        },

        button: {
            padding: "14px 20px",
            borderRadius: "12px",
            border: "none",
            background: "#0F172A",
            color: "#FFFFFF",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "15px",
        },
    };

    return (
        <div style={styles.container}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage(input);
                        setInput("");
                    }
                }}
                placeholder="Ask about books, events, cafeteria..."
                style={styles.input}
            />

            <button
                onClick={() => {
                    sendMessage(input);
                    setInput("");
                }}
                style={styles.button}
            >
                Send
            </button>
        </div>
    );
}
export default ChatBox;