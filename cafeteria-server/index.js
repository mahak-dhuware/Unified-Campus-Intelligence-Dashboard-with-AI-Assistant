const express = require("express");
const cors = require("cors");

const { getTodaysMenu } = require("./data/menu");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/menu", (req, res) => {
    res.json(getTodaysMenu());
});

app.listen(5003, () => {
    console.log("🍽️ Cafeteria Server running on port 5003");
});