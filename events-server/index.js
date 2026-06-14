const express = require("express");
const cors = require("cors");

const { getUpcomingEvents } = require("./data/events");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/events", (req, res) => {
    res.json(getUpcomingEvents());
});

app.listen(5002, () => {
    console.log("🎉 Events Server running on port 5002");
});