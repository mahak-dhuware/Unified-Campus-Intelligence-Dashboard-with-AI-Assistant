const express = require("express");
const cors = require("cors");

const { getBooks } = require("./data/books");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/books", (req, res) => {
    res.json(getBooks());
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Library server running");
});