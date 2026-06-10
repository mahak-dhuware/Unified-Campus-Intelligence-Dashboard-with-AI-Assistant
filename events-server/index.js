const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const events = [
  {
    id: 1,
    name: "Hackathon 2026",
    date: "10 June 2026",
    location: "Auditorium",
  },
  {
    id: 2,
    name: "AI Workshop",
    date: "12 June 2026",
    location: "Lab 3",
  },
  {
    id: 3,
    name: "Coding Contest",
    date: "15 June 2026",
    location: "Computer Center",
  },
];

app.get("/events", (req, res) => {
  res.json(events);
});

app.listen(5002, () => {
  console.log("🎉 Events Server running on port 5002");
});