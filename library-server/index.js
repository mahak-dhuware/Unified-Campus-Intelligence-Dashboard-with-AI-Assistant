const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const books = [
    {
        title: "Atomic Habits",
        available: true,
    },
    {
        title: "Clean Code",
        available: true,
    },
    {
        title: "System Design Interview",
        available: false,
    },
];

app.get("/books", (req, res) => {
    res.json(books);
});

app.listen(5001, () => {
    console.log("Library Server running on port 5001");
});