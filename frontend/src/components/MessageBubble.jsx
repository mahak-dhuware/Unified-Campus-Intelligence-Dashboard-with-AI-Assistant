function MessageBubble({ sender, text }) {
    const isUser = sender === "user";

    return (
        <div
            style={{
                display: "flex",
                justifyContent: isUser
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "20px",
            }}
        >
            <div
                style={{
                    maxWidth: isUser ? "70%" : "80%",
                    padding: "14px 18px",
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
                        fontWeight: "500",
                        marginBottom: "8px",
                        opacity: 0.8,
                    }}
                >
                    {isUser
                        ? "👤 You"
                        : "🤖 Campus AI"}
                </div>

                <div
                    style={{
                        whiteSpace: "pre-line",
                        lineHeight: "1.6",
                        wordBreak: "break-word",
                    }}
                >
                    {text}
                </div>
            </div>
        </div>
    );
}

export default MessageBubble;