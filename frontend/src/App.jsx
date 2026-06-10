import { useState } from "react";
import ChatBox from "./components/ChatBox";
import MessageBubble from "./components/MessageBubble";
import QuickActions from "./components/QuickActions";

function App() {
    const [messages, setMessages] = useState([]);

    return (
        <div style={styles.container}>
            <h1>🎓 Campus AI Assistant</h1>
            <p>Ask anything about your campus.</p>

            <QuickActions
                setMessages={setMessages}
            />

            <div style={styles.chatArea}>
                {messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        sender={msg.sender}
                        text={msg.text}
                    />
                ))}
            </div>

            <ChatBox
                messages={messages}
                setMessages={setMessages}
            />
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