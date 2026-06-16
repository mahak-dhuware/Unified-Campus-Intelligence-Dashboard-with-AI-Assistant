const express = require("express");
const cors = require("cors");

const { getUpcomingEvents } = require("./data/events");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/events", (req, res) => {
    res.json(getUpcomingEvents());
});
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log("Events server running");
});