import { useState, useRef, useEffect } from "react";
import ChatBox from "./components/ChatBox";
import MessageBubble from "./components/MessageBubble";
import { sendMessage as sendToAI } from "./services/api";
import {
    GraduationCap,
    BookOpen,
    Calendar,
    UtensilsCrossed,
    Menu,
    X,
} from "lucide-react";
function App() {

    const isMobile = window.innerWidth <= 768;
    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const chatEndRef = useRef(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);
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
        setLoading(true);

        try {
            setLoading(true);
            const response = await sendToAI(text);

            let replyText = "";

            if (Array.isArray(response.reply)) {
                replyText = response.reply
                    .map((item) => {
                        if (item.title) {
                            return `<BookOpen size={18} /> ${item.title} - ${item.available
                                ? "Available"
                                : "Unavailable"
                                }`;
                        }

                        if (item.name) {
                            return `<Calendar size={18} /> ${item.name} (${item.date})`;
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
                            `<UtensilsCrossed size={18} /> ${key}: ${value}`
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
            setLoading(false);
        } catch (error) {

            setLoading(false);
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
            <div style={styles.layout}>
                <aside
                    style={{
                        ...styles.sidebar,

                        ...(isMobile && {
                            position: "fixed",
                            top: 0,
                            left: sidebarOpen ? 0 : "-320px",
                            height: "100vh",
                            zIndex: 1000,
                            transition: "left 0.3s ease",
                            borderRadius: 0,
                        }),
                    }}
                >
                    <button
                        style={{
                            ...styles.closeButton,
                            display: isMobile ? "block" : "none",
                        }}
                        onClick={() => setSidebarOpen(false)}
                    >
                        ✕
                    </button>
                    <div style={styles.sidebarHeader}>
                        <div style={styles.logo}>
                            <GraduationCap size={24} />
                        </div>

                        <div>
                            <div style={styles.sidebarTitle}>
                                Campus AI
                            </div>

                            <div style={styles.sidebarSubtitle}>
                                Unified Assistant
                            </div>
                        </div>
                    </div>

                    <div style={styles.section}>
                        <div style={styles.sectionTitle}>
                            Example Prompts
                        </div>

                        <div
                            style={styles.promptCard}
                            onClick={() => sendMessage("What books are available?")}
                        >
                            <BookOpen size={18} /> What books are available?
                        </div>

                        <div style={styles.promptCard}
                            onClick={() => sendMessage(" Any upcoming events?")}>
                            <Calendar size={18} /> Any upcoming events?
                        </div>

                        <div style={styles.promptCard}
                            onClick={() => sendMessage(" What's today's menu")}>
                            <UtensilsCrossed size={18} /> What's today's menu?
                        </div>
                    </div>

                    <div style={styles.section}>
                        <div style={styles.sectionTitle}>
                            Connected Services
                        </div>

                        <div style={styles.service}>
                            <BookOpen size={18} /> Library MCP
                        </div>

                        <div style={styles.service}>
                            <Calendar size={18} /> Events MCP
                        </div>

                        <div style={styles.service}>
                            <UtensilsCrossed size={18} /> Cafeteria MCP
                        </div>
                    </div>
                </aside>
                {
                    isMobile && sidebarOpen && (
                        <div
                            style={styles.overlay}
                            onClick={() =>
                                setSidebarOpen(false)
                            }
                        />
                    )
                }

                <main style={styles.main}>
                    <div style={{
                        ...styles.mobileHeader,
                        display: isMobile ? "flex" : "none",
                    }}>
                        <button
                            style={styles.menuButton}
                            onClick={() => setSidebarOpen(true)}
                        >
                            ☰
                        </button>

                        <span style={styles.mobileTitle}>
                            Campus AI
                        </span>
                    </div>
                    <div style={styles.header}>
                        <h1 style={styles.title}>
                            Campus Intelligence Dashboard
                        </h1>

                        <p style={styles.subtitle}>
                            AI-powered unified campus assistant
                        </p>

                        <p style={styles.poweredBy}>
                            Powered by • Library • Events • Cafeteria
                        </p>
                    </div>


                    <div style={styles.chatContainer}>
                        <div style={styles.chatArea}>
                            {messages.length === 0 && (
                                <div style={styles.emptyState}>
                                    <h3>👋 Welcome to Campus AI</h3>

                                    <p>
                                        Ask anything about books,
                                        events, or cafeteria services.
                                    </p>
                                </div>
                            )}

                            {messages.map((msg, index) => (
                                <MessageBubble
                                    key={index}
                                    sender={msg.sender}
                                    text={msg.text}
                                />
                            ))}

                            {loading && (
                                <div style={styles.typingContainer}>
                                    <span>Campus AI is typing</span>

                                    <div style={styles.dots}>
                                        <span>.</span>
                                        <span>.</span>
                                        <span>.</span>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef}></div>
                        </div>

                        <div style={styles.inputWrapper}>
                            <ChatBox sendMessage={sendMessage} />
                        </div>
                    </div>
                </main>

            </div>
        </div>
    );
}

const styles = {

    typingContainer: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        color: "#64748B",
        fontStyle: "italic",
    },

    dots: {
        letterSpacing: "4px",
        fontWeight: "bold",
    },

    mobileHeader: {
        display: "none",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px",
    },

    mobileTitle: {
        fontWeight: "700",
        color: "#0F172A",
    },

    menuButton: {
        border: "none",
        background: "transparent",
        fontSize: "24px",
        cursor: "pointer",
    },

    closeButton: {
        display: "none",
        border: "none",
        background: "transparent",
        fontSize: "24px",
        cursor: "pointer",
        marginBottom: "20px",
    },

    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 999,
    },

    sidebarHeader: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "32px",
    },

    logo: {
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: "#0F172A",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
    },

    sidebarTitle: {
        fontWeight: "700",
        color: "#0F172A",
    },

    sidebarSubtitle: {
        fontSize: "13px",
        color: "#64748B",
    },

    section: {
        marginBottom: "28px",
    },

    sectionTitle: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#94A3B8",
        marginBottom: "12px",
        textTransform: "uppercase",
    },

    promptCard: {
        padding: "12px",
        border: "1px solid #E2E8F0",
        borderRadius: "12px",
        marginBottom: "10px",
        cursor: "pointer",
        color: "#0F172A",
    },

    service: {
        padding: "10px 0",
        color: "#334155",
    },

    layout: {
        display: "flex",
        gap: "24px",
    },

    sidebar: {
        width: "260px",
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "20px",
        padding: "24px",
        flexShrink: 0,
    },
    sidebarOpen: {},

    main: {
        flex: 1,
    },

    header: {
        marginBottom: "30px",
    },

    title: {
        fontSize: "32px",
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: "8px",
    },

    subtitle: {
        color: "#64748B",
        marginBottom: "8px",
    },

    poweredBy: {
        color: "#94A3B8",
        fontSize: "14px",
    },


    loading: {
        marginTop: "12px",
        color: "#4f46e5",
        fontStyle: "italic",
        fontWeight: "500",
    },

    container: {
        maxWidth: "850px",
        margin: "0 auto",
        padding: "40px 24px",
        fontFamily: "Inter, sans-serif",
        backgroundColor: "#F8FAFC",
        minHeight: "100vh",
    },
    chatContainer: {
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: "20px",
        overflow: "hidden",
    },

    chatArea: {
        minHeight: "450px",
        maxHeight: "500px",
        overflowY: "auto",
        padding: "24px",
    },

    inputWrapper: {
        borderTop: "1px solid #E2E8F0",
        padding: "20px",
        background: "#FFFFFF",
    },

    emptyState: {
        textAlign: "center",
        color: "#64748B",
        marginTop: "150px",
    },

    loading: {
        color: "#64748B",
        fontStyle: "italic",
        marginTop: "12px",
    },
    examples: {
        marginTop: "16px",
        color: "#64748B",
        fontSize: "14px",
        lineHeight: "1.8",
    },


};

export default App;