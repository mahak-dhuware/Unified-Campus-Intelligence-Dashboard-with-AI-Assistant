const express = require("express");
const cors = require("cors");

const { getTodaysMenu } = require("./data/menu");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/menu", (req, res) => {
    res.json(getTodaysMenu());
});
const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log("Cafeteria server running");
});