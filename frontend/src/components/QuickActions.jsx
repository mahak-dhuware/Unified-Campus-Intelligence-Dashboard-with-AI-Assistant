function QuickActions({ sendMessage }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <button onClick={() => sendMessage("What books are available?")}>
                📚 Books
            </button>

            <button
                style={{ marginLeft: "10px" }}
                onClick={() => sendMessage("Any upcoming events?")}
            >
                🎉 Events
            </button>

            <button
                style={{ marginLeft: "10px" }}
                onClick={() => sendMessage("What's today's menu?")}
            >
                🍽 Menu
            </button>
        </div>
    );
}

export default QuickActions;