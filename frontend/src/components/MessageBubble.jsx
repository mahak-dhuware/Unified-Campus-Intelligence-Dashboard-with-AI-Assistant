import ReactMarkdown from "react-markdown";

function MessageBubble({ sender, text }) {
    const isUser = sender === "user";

    return (
        <div
            style={{
                display: "flex",
                justifyContent: isUser
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "16px",
            }}
        >
            <div
                style={{
                    maxWidth: isUser ? "70%" : "100%",
                    minWidth: isUser ? "auto" : "320px",
                    padding: "16px 20px",
                    borderRadius: isUser
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    background: isUser
                        ? "#4338CA"
                        : "#FFFFFF",
                    color: isUser
                        ? "#FFFFFF"
                        : "#111827",
                    boxShadow:
                        "0 2px 8px rgba(0,0,0,0.08)",
                    border: isUser
                        ? "none"
                        : "1px solid #E5E7EB",
                }}
            >
                <div
                    style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        marginBottom: "10px",
                        opacity: 0.8,
                    }}
                >
                    {isUser
                        ? "👤 You"
                        : "🤖 Campus AI"}
                </div>

                <div
                    style={{
                        padding: "8px 12px",
lineHeight: "1.3",
marginBottom: "6px",
fontSize: "14px"
                    }}
                >
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

export default MessageBubble;