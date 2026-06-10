function MessageBubble({ sender, text }) {
    return (
        <div
            style={{
                textAlign:
                    sender === "user"
                        ? "right"
                        : "left",
                marginBottom: "15px",
            }}
        >
            <div
                style={{
                    display: "inline-block",
                    padding: "12px",
                    borderRadius: "12px",
                    background:
                        sender === "user"
                            ? "#4f46e5"
                            : "#f3f4f6",
                    color:
                        sender === "user"
                            ? "white"
                            : "black",
                }}
            >
                <div
                    style={{
                        whiteSpace: "pre-line",
                    }}
                >
                    {text}
                </div>
            </div>
        </div>
    );
}

export default MessageBubble;