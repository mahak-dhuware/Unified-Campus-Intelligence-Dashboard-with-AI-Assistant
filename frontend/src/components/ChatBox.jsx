import { useState } from "react";

function ChatBox({ sendMessage }) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;

        sendMessage(input);
        setInput("");
    };

    return (
        <div style={{ display: "flex", gap: "10px" }}>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                    }
                }}
            />

            <button onClick={handleSend}>
                Send
            </button>
        </div>
    );
}

export default ChatBox;