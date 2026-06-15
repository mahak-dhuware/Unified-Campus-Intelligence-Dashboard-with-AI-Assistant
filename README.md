# 🎓 Unified Campus Intelligence Dashboard with AI Assistant

A distributed, AI-powered campus assistant that unifies fragmented campus services into a single intelligent interface. Students can ask natural language questions about library resources, campus events, and cafeteria services, while the AI dynamically routes requests to independent MCP servers and returns live results.

## 🚀 Deployed Demo

**Frontend:**
https://unified-campus-intelligence-dashboa-weld.vercel.app/

**AI Server:**
https://unified-campus-intelligence-dashboard-auss.onrender.com/

---

## 📌 Project Description

College campuses often have information scattered across multiple disconnected systems such as library portals, event platforms, cafeteria websites, and academic resources. Students spend valuable time navigating different platforms to access simple information.

This project addresses that challenge by providing a unified dashboard featuring an embedded AI assistant. The assistant understands natural language queries and dynamically routes requests to independent Model Context Protocol (MCP) servers to fetch live information from different campus services.

Instead of relying on a centralized database, each campus service maintains its own independent backend, making the system modular, scalable, and easier to maintain.

---

## ✨ Features

* 🤖 AI-powered campus assistant with natural language interaction.
* 📚 Retrieve available books from the library system.
* 🎉 Access upcoming campus events.
* 🍽 View cafeteria menu information.
* 🔄 Dynamic routing of user queries to appropriate MCP servers.
* ⚡ Live data retrieval from independent services.
* 💬 Unified chat-based dashboard for all campus services.
* 📱 Responsive and user-friendly interface.
* 🏗 Distributed architecture without a centralized database.

---

## 🏛 System Architecture

```text
                 React Frontend (Vercel)
                          │
                          ▼
                AI Server (Render)
             OpenRouter + Tool Routing
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
 Library MCP       Events MCP      Cafeteria MCP
   (Render)          (Render)          (Render)
```

---

## 🛠 Tech Stack

### Frontend

* React.js
* Vite
* Lucide React

### Backend

* Node.js
* Express.js

### AI Integration

* OpenRouter API
* Function/Tool Calling

### Utilities

* Axios
* CORS
* dotenv

### Deployment

* Vercel (Frontend)
* Render (Backend Services)

---

## 📂 Project Structure

```text
Unified-Campus-Intelligence-Dashboard-with-AI-Assistant/
│
├── frontend/
├── ai-server/
├── library-server/
├── events-server/
└── cafeteria-server/
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/mahak-dhuware/Unified-Campus-Intelligence-Dashboard-with-AI-Assistant.git

cd campus-dashboard
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

---

### 3. AI Server Setup

```bash
cd ai-server
npm install
npm run dev
```

Create a `.env` file:

```env
OPENROUTER_API_KEY=your_openrouter_api_key
LIBRARY_URL=http://localhost:5001
EVENTS_URL=http://localhost:5002
CAFETERIA_URL=http://localhost:5003
```

---

### 4. Library Server Setup

```bash
cd library-server
npm install
npm run dev
```

---

### 5. Events Server Setup

```bash
cd events-server
npm install
npm run dev
```

---

### 6. Cafeteria Server Setup

```bash
cd cafeteria-server
npm install
npm run dev
```

---

## 💬 Example Queries

* What books are available?
* Any upcoming events?
* What's today's menu?

---

## 🔮 Future Enhancements

* Student authentication and personalization.
* Conversation history.
* Additional campus service integrations.
* Dashboard widgets and analytics.

---

## 👨‍💻 Author

**Mahak Dhuware**

GitHub: https://github.com/mahak-dhuware

---

Built to simplify campus life through distributed intelligence and AI-powered interactions.
