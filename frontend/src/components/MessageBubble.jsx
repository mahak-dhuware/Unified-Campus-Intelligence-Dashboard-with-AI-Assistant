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
                    maxWidth: "75%",
                    padding: "14px 18px",
                    borderRadius: "18px",
                    background: isUser
                        ? "#4f46e5"
                        : "#ffffff",
                    color: isUser
                        ? "white"
                        : "#111827",
                    boxShadow:
                        "0 2px 8px rgba(0,0,0,0.08)",
                    border: isUser
                        ? "none"
                        : "1px solid #e5e7eb",
                }}
            >
                <div
                    style={{
                        fontSize: "12px",
                        fontWeight: "600",
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
                    }}
                >
                    {text}
                </div>
            </div>
        </div>
    );
}

export default MessageBubble;