// import { useState, useRef, useEffect } from "react";
// import ChatBox from "./components/ChatBox";
// import MessageBubble from "./components/MessageBubble";
// import { sendMessage as sendToAI } from "./services/api";
// import {
//     GraduationCap,
//     BookOpen,
//     Calendar,
//     UtensilsCrossed,
//     Menu,
//     X,
// } from "lucide-react";


// function App() {

//     const [isMobile, setIsMobile] = useState(() =>
//     typeof window !== "undefined" ? window.innerWidth <= 768 : false
// );
//     const [messages, setMessages] = useState([]);

//     const [loading, setLoading] = useState(false);

//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const chatEndRef = useRef(null);
 

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth <= 768);
//         };

//         window.addEventListener("resize", handleResize);

//         return () =>
//             window.removeEventListener(
//                 "resize",
//                 handleResize
//             );
//     }, []);
//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({
//             behavior: "smooth",
//         });
//     }, [messages, loading]);
//     const sendMessage = async (text) => {
//         if (!text.trim() || loading) return;

//         // User message
//         setMessages((prev) => [
//             ...prev,
//             {
//                 sender: "user",
//                 text,
//             },
//         ]);
//         setLoading(true);

//         try {

//            const timeoutPromise = new Promise((_, reject) =>
//     setTimeout(() => reject(new Error("timeout")), 25000)
// );

// const response = await Promise.race([
//     sendToAI(text),
//     timeoutPromise,
// ]);

//             setMessages(prev => [...prev, {
//                 sender: "assistant",
//                 text: response.reply
//             }]);

//             setLoading(false);
//         } catch (error) {

//             setLoading(false);
//             console.error(error);


//             setMessages((prev) => [
//                 ...prev,
//                 {
//                     sender: "assistant",
//                     text:
//                         "⚠️ Sorry, I couldn't process your request. Please try again.",
//                 },
//             ]);
//         }
//     };

//     const styles = {

//         welcome: {
//             textAlign: "center",
//             color: "#475569",
//             marginTop: "60px",
//         },

//         promptContainer: {
//             display: "flex",
//             justifyContent: "center",
//             gap: "12px",
//             flexWrap: "wrap",
//             marginTop: "24px",
//         },

//         promptChip: {
//             border: "1px solid #CBD5E1",
//             background: "#FFFFFF",
//             padding: "12px 18px",
//             borderRadius: "999px",
//             cursor: "pointer",
//             fontSize: "14px",
//             transition: "all 0.2s ease",
//             fontWeight: "500",

//         },

//         topBar: {
//             position: "relative",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginBottom: "24px",
//             flexShrink: 0,
//             padding: isMobile ? "0 48px" : "0",
//         },

//         topBarCenter: {
//             flex: 1,
//             textAlign: "center",
//             padding: isMobile ? "0 8px" : 0,
//         },
//         typingContainer: {
//             display: "flex",
//             alignItems: "center",
//             gap: "8px",
//             color: "#64748B",
//             fontStyle: "italic",
//         },

//         dots: {
//             letterSpacing: "4px",
//             fontWeight: "bold",
//         },


//         menuButton: {
//             position: "absolute",
//             left: 0,
//             border: "none",
//             background: "transparent",
//             cursor: "pointer",
//             padding: "8px",
//         },

//         closeButton: {
//             border: "none",
//             background: "transparent",
//             fontSize: "24px",
//             cursor: "pointer",
//             marginBottom: "20px",
//         },

//         overlay: {
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.4)",
//             zIndex: 999,
//         },

//         sidebarHeader: {
//             display: "flex",
//             alignItems: "center",
//             gap: "12px",
//             marginBottom: "32px",
//         },

//         logo: {
//             width: "48px",
//             height: "48px",
//             borderRadius: "14px",
//             background: "#0F172A",
//             color: "#FFFFFF",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "22px",
//         },

//         sidebarTitle: {
//             fontWeight: "700",
//             color: "#0F172A",
//         },

//         sidebarSubtitle: {
//             fontSize: "13px",
//             color: "#64748B",
//         },
//         sidebarHeading: {
//             fontSize: "14px",
//             color: "#64748B",
//             marginTop: "24px",
//             marginBottom: "12px",
//         },

//         architectureBox: {
//             background: "#F8FAFC",
//             border: "1px solid #E2E8F0",
//             borderRadius: "12px",
//             padding: "12px",
//             fontSize: "14px",
//             color: "#334155",
//             lineHeight: "1.5",
//         },

//         section: {
//             marginBottom: "28px",
//         },

//         sectionTitle: {
//             fontSize: "13px",
//             fontWeight: "600",
//             color: "#94A3B8",
//             marginBottom: "12px",
//             textTransform: "uppercase",
//         },

//         promptCard: {
//             padding: "12px",
//             border: "1px solid #E2E8F0",
//             borderRadius: "12px",
//             marginBottom: "10px",
//             cursor: "pointer",
//             color: "#0F172A",
//         },

//         service: {
//             padding: "10px 0",
//             color: "#334155",
//         },
//         layout: {
//             position: "relative",
//             display: "flex",
//             flexDirection: "column",
//             height: "100%",
//             overflow: "hidden",
//         },
//         sidebar: {
//             width: "260px",
//             background: "#FFFFFF",
//             border: "1px solid #E2E8F0",
//             borderRadius: "20px",
//             padding: "24px",
//             flexShrink: 0,
//             position: "absolute",
//             left: 0,
//             top: 0,
//         },



//         title: {
//             fontSize: isMobile ? "22px" : "28px",
//             margin: 0,
//             lineHeight: 1.2,
//             wordBreak: "break-word",
//         },
//         subtitle: {
//             color: "#64748B",
//             margin: "6px 0 0",
//             fontSize: isMobile ? "13px" : "16px",
//         },
//         poweredBy: {
//             color: "#94A3B8",
//             fontSize: "14px",
//         },


//         loading: {
//             marginTop: "12px",
//             color: "#4f46e5",
//             fontStyle: "italic",
//             fontWeight: "500",
//         },

//         dashboard: {
//             width: "100%",
//             height: "100vh",
//             background: "#F8FAFC",
//             padding: "24px",
//             boxSizing: "border-box",
//         },

//         container: {
//             position: "relative",
//             width: "100%",
//             maxWidth: "1300px",
//             margin: "0 auto",
//             padding: isMobile ? "12px" : "24px",
//             fontFamily: "Inter, sans-serif",
//             backgroundColor: "#F8FAFC",
//             height: "100vh",
//             overflow: "hidden",
//             boxSizing: "border-box",
//         },
//         chatContainer: {
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             minHeight: 0,
//         },

//         chatArea: {
//             flex: 1,
//             overflowY: "auto",
//             minHeight: 0,
//             padding: "12px",
//             background: "#FFFFFF",
//             border: "1px solid #E2E8F0",
//             borderRadius: isMobile
//                 ? "16px 16px 0 0"
//                 : "20px 20px 0 0",
//             boxShadow: "0 4px 20px rgba(15,23,42,0.08)",
//         },
//         inputWrapper: {
//             borderTop: "1px solid #E2E8F0",
//             padding: "20px",
//             background: "#FFFFFF",
//             flexShrink: 0,
//             position: "sticky",
//             bottom: 0,
//             zIndex: 2,
//         },

//         emptyState: {
//             textAlign: "center",
//             color: "#64748B",
//             marginTop: "150px",
//         },


//         examples: {
//             marginTop: "16px",
//             color: "#64748B",
//             fontSize: "14px",
//             lineHeight: "1.8",
//         },
       


//     };

//     return (
//         <div style={styles.dashboard}>
//             <div style={styles.container}>
//                 <div style={styles.layout}>
//                     <aside
//                         style={{
//                             ...styles.sidebar,
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             height: "100vh",
//                             width: isMobile ? "85%" : "320px",
//                             zIndex: 1000,
//                             transform: sidebarOpen
//                                 ? "translateX(0)"
//                                 : "translateX(-100%)",
//                             transition: "transform 0.3s ease",
//                             borderRadius: 0,
//                             overflowY: "auto",
//                         }}
//                     >
//                         <button
//                             style={styles.closeButton}
//                             onClick={() => setSidebarOpen(false)}
//                         >
//                             ✕
//                         </button>
//                         <div style={styles.sidebarHeader}>
//                             <div style={styles.logo}>
//                                 <GraduationCap size={24} />
//                             </div>

//                             <div>
//                                 <div style={styles.sidebarTitle}>
//                                     Campus AI
//                                 </div>

//                                 <div style={styles.sidebarSubtitle}>
//                                     Unified Assistant
//                                 </div>
//                             </div>
//                         </div>

//                         <div style={styles.section}>
//                             <div style={styles.sectionTitle}>
//                                 Connected Services
//                             </div>

//                             <div style={styles.service}>
//                                 🟢 Library MCP
//                             </div>

//                             <div style={styles.service}>
//                                 🟢 Events MCP
//                             </div>

//                             <div style={styles.service}>
//                                 🟢 Cafeteria MCP
//                             </div>
//                         </div>

//                         <div style={styles.section}>
//                             <div style={styles.sectionTitle}>
//                                 Example Prompts
//                             </div>

//                             <div
//                                 style={styles.promptCard}
//                                 onClick={() => {
//                                     sendMessage("What books are available?");
//                                     setSidebarOpen(false);
//                                 }}

//                             >
//                                 What books are available?
//                             </div>

//                             <div style={styles.promptCard}
//                                 onClick={() => { sendMessage(" Any upcoming events?"); setSidebarOpen(false); }}>
//                                 Any upcoming events?
//                             </div>

//                             <div style={styles.promptCard}
//                                 onClick={() => { sendMessage(" What's today's menu"); setSidebarOpen(false);; }}>
//                                 What's today's menu?
//                             </div>
//                         </div>
//                         <h3 style={styles.sidebarHeading}>
//                             Architecture
//                         </h3>

//                         <div style={styles.architectureBox}>
//                             Independent MCP servers route
//                             requests dynamically based on
//                             student queries.
//                         </div>


//                     </aside>
//                     {sidebarOpen && (
//                         <div
//                             style={styles.overlay}
//                             onClick={() => setSidebarOpen(false)}
//                         />
//                     )}




//                     <div
//                         style={{
//                             flex: 1,
//                             display: "flex",
//                             flexDirection: "column",
//                             overflow: "hidden",
//                             minHeight: 0,
//                         }}
//                     >
//                         <div style={styles.topBar}>
//                             <button
//                                 style={styles.menuButton}
//                                 onClick={() => setSidebarOpen(true)}
//                             >
//                                 <Menu size={24} />
//                             </button>

//                             <div style={styles.topBarCenter}>
//                                 <h1 style={styles.title}>
//                                     {isMobile
//                                         ? "Campus AI"
//                                         : "Campus Intelligence Dashboard"}
//                                 </h1>

//                                 <p style={styles.subtitle}>
//                                     AI-powered unified campus assistant
//                                 </p>
//                             </div>


//                         </div>
               
//                         <div style={styles.chatContainer}>
//                             <div style={styles.chatArea}>
//                                 {messages.length === 0 && (
//                                     <div style={styles.welcome}>
//                                         <h2>👋 Welcome to Campus AI</h2>

//                                         <p>
//                                             Ask anything about books, events,
//                                             or cafeteria services.
//                                         </p>

//                                         <div style={styles.promptContainer}>
//                                             <button
//                                                 style={styles.promptChip}
//                                                 onMouseEnter={(e) => {
//                                                     e.target.style.background = "#EEF2FF";
//                                                 }}
//                                                 onMouseLeave={(e) => {
//                                                     e.target.style.background = "#FFFFFF";
//                                                 }}
//                                                 onClick={() =>
//                                                     sendMessage("What books are available?")
//                                                 }
//                                             >
//                                                 📚 Available Books
//                                             </button>

//                                             <button
//                                                 style={styles.promptChip}
//                                                 onMouseEnter={(e) => {
//                                                     e.target.style.background = "#EEF2FF";
//                                                 }}
//                                                 onMouseLeave={(e) => {
//                                                     e.target.style.background = "#FFFFFF";
//                                                 }}
//                                                 onClick={() =>
//                                                     sendMessage("Any upcoming events?")
//                                                 }
//                                             >
//                                                 🎉 Upcoming Events
//                                             </button>

//                                             <button
//                                                 style={styles.promptChip}
//                                                 onMouseEnter={(e) => {
//                                                     e.target.style.background = "#EEF2FF";
//                                                 }}
//                                                 onMouseLeave={(e) => {
//                                                     e.target.style.background = "#FFFFFF";
//                                                 }}
//                                                 onClick={() =>
//                                                     sendMessage("What's today's menu?")
//                                                 }
//                                             >
//                                                 🍽 Today's Menu
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {messages.map((msg, index) => (
//                                     <MessageBubble
//                                         key={index}
//                                         sender={msg.sender}
//                                         text={msg.text}
//                                     />
//                                 ))}

//                                 {loading && (
//                                     <div style={styles.typingContainer}>
//                                         <span>🤖 Campus AI is thinking</span>

//                                         <div style={styles.dots}>
//                                             <span>.</span>
//                                             <span>.</span>
//                                             <span>.</span>
//                                         </div>
//                                     </div>
//                                 )}
//                                 <div ref={chatEndRef}></div>
//                             </div>

//                             <div style={styles.inputWrapper}>
//                                 <ChatBox
//                                     sendMessage={sendMessage}
//                                     disabled={loading}
//                                 />
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>

//     );
// }



// export default App;

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

    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= 768
    );
    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const chatEndRef = useRef(null);
 

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () =>
            window.removeEventListener(
                "resize",
                handleResize
            );
    }, []);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);
    const sendMessage = async (text) => {
        if (!text.trim() || loading) return;

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

            const response = await sendToAI(text);

            setMessages(prev => [...prev, {
                sender: "assistant",
                text: response.reply
            }]);

            setLoading(false);
        } catch (error) {

            setLoading(false);
            console.error(error);


            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text:
                        "⚠️ Sorry, I couldn't process your request. Please try again.",
                },
            ]);
        }
    };

    const styles = {

        welcome: {
            textAlign: "center",
            color: "#475569",
            marginTop: "60px",
        },

        promptContainer: {
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "24px",
        },

        promptChip: {
            border: "1px solid #CBD5E1",
            background: "#FFFFFF",
            padding: "12px 18px",
            borderRadius: "999px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "all 0.2s ease",
            fontWeight: "500",

        },

        topBar: {
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            flexShrink: 0,
            padding: isMobile ? "0 48px" : "0",
        },

        topBarCenter: {
            flex: 1,
            textAlign: "center",
            padding: isMobile ? "0 8px" : 0,
        },
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


        menuButton: {
            position: "absolute",
            left: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "8px",
        },

        closeButton: {
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
        sidebarHeading: {
            fontSize: "14px",
            color: "#64748B",
            marginTop: "24px",
            marginBottom: "12px",
        },

        architectureBox: {
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "12px",
            padding: "12px",
            fontSize: "14px",
            color: "#334155",
            lineHeight: "1.5",
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
            position: "relative",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
        },
        sidebar: {
            width: "260px",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: "20px",
            padding: "24px",
            flexShrink: 0,
            position: "absolute",
            left: 0,
            top: 0,
        },



        title: {
            fontSize: isMobile ? "22px" : "28px",
            margin: 0,
            lineHeight: 1.2,
            wordBreak: "break-word",
        },
        subtitle: {
            color: "#64748B",
            margin: "6px 0 0",
            fontSize: isMobile ? "13px" : "16px",
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

        dashboard: {
            width: "100%",
            height: "100vh",
            background: "#F8FAFC",
            padding: "24px",
            boxSizing: "border-box",
        },

        container: {
            position: "relative",
            width: "100%",
            maxWidth: "1300px",
            margin: "0 auto",
            padding: isMobile ? "12px" : "24px",
            fontFamily: "Inter, sans-serif",
            backgroundColor: "#F8FAFC",
            height: "100vh",
            overflow: "hidden",
            boxSizing: "border-box",
        },
        chatContainer: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minHeight: 0,
        },

        chatArea: {
            flex: 1,
            overflowY: "auto",
            minHeight: 0,
            padding: "12px",
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            borderRadius: isMobile
                ? "16px 16px 0 0"
                : "20px 20px 0 0",
            boxShadow: "0 4px 20px rgba(15,23,42,0.08)",
        },
        inputWrapper: {
            borderTop: "1px solid #E2E8F0",
            padding: "20px",
            background: "#FFFFFF",
            flexShrink: 0,
            position: "sticky",
            bottom: 0,
            zIndex: 2,
        },

        emptyState: {
            textAlign: "center",
            color: "#64748B",
            marginTop: "150px",
        },


        examples: {
            marginTop: "16px",
            color: "#64748B",
            fontSize: "14px",
            lineHeight: "1.8",
        },
       


    };

    return (
        <div style={styles.dashboard}>
            <div style={styles.container}>
                <div style={styles.layout}>
                    <aside
                        style={{
                            ...styles.sidebar,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: "100vh",
                            width: isMobile ? "85%" : "320px",
                            zIndex: 1000,
                            transform: sidebarOpen
                                ? "translateX(0)"
                                : "translateX(-100%)",
                            transition: "transform 0.3s ease",
                            borderRadius: 0,
                            overflowY: "auto",
                        }}
                    >
                        <button
                            style={styles.closeButton}
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
                                Connected Services
                            </div>

                            <div style={styles.service}>
                                🟢 Library MCP
                            </div>

                            <div style={styles.service}>
                                🟢 Events MCP
                            </div>

                            <div style={styles.service}>
                                🟢 Cafeteria MCP
                            </div>
                        </div>

                        <div style={styles.section}>
                            <div style={styles.sectionTitle}>
                                Example Prompts
                            </div>

                            <div
                                style={styles.promptCard}
                                onClick={() => {
                                    sendMessage("What books are available?");
                                    setSidebarOpen(false);
                                }}

                            >
                                What books are available?
                            </div>

                            <div style={styles.promptCard}
                                onClick={() => { sendMessage(" Any upcoming events?"); setSidebarOpen(false); }}>
                                Any upcoming events?
                            </div>

                            <div style={styles.promptCard}
                                onClick={() => { sendMessage(" What's today's menu"); setSidebarOpen(false);; }}>
                                What's today's menu?
                            </div>
                        </div>
                        <h3 style={styles.sidebarHeading}>
                            Architecture
                        </h3>

                        <div style={styles.architectureBox}>
                            Independent MCP servers route
                            requests dynamically based on
                            student queries.
                        </div>


                    </aside>
                    {sidebarOpen && (
                        <div
                            style={styles.overlay}
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}




                    <div
                        style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            minHeight: 0,
                        }}
                    >
                        <div style={styles.topBar}>
                            <button
                                style={styles.menuButton}
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu size={24} />
                            </button>

                            <div style={styles.topBarCenter}>
                                <h1 style={styles.title}>
                                    {isMobile
                                        ? "Campus AI"
                                        : "Campus Intelligence Dashboard"}
                                </h1>

                                <p style={styles.subtitle}>
                                    AI-powered unified campus assistant
                                </p>
                            </div>


                        </div>
               
                        <div style={styles.chatContainer}>
                            <div style={styles.chatArea}>
                                {messages.length === 0 && (
                                    <div style={styles.welcome}>
                                        <h2>👋 Welcome to Campus AI</h2>

                                        <p>
                                            Ask anything about books, events,
                                            or cafeteria services.
                                        </p>

                                        <div style={styles.promptContainer}>
                                            <button
                                                style={styles.promptChip}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = "#EEF2FF";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = "#FFFFFF";
                                                }}
                                                onClick={() =>
                                                    sendMessage("What books are available?")
                                                }
                                            >
                                                📚 Available Books
                                            </button>

                                            <button
                                                style={styles.promptChip}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = "#EEF2FF";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = "#FFFFFF";
                                                }}
                                                onClick={() =>
                                                    sendMessage("Any upcoming events?")
                                                }
                                            >
                                                🎉 Upcoming Events
                                            </button>

                                            <button
                                                style={styles.promptChip}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = "#EEF2FF";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = "#FFFFFF";
                                                }}
                                                onClick={() =>
                                                    sendMessage("What's today's menu?")
                                                }
                                            >
                                                🍽 Today's Menu
                                            </button>
                                        </div>
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
                                        <span>🤖 Campus AI is thinking</span>

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
                                <ChatBox
                                    sendMessage={sendMessage}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}



export default App;