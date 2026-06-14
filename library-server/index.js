const express = require("express");
const cors = require("cors");

const { getBooks } = require("./data/books");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/books", (req, res) => {
    res.json(getBooks());
});

app.listen(5001, () => {
    console.log("📚 Library Server running on port 5001");
});