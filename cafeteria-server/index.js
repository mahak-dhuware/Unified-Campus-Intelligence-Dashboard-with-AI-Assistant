const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const menu = {
  breakfast: "Poha",
  lunch: "Paneer Biryani",
  snacks: "Samosa",
  dinner: "Dal Rice"
};

app.get("/menu", (req, res) => {
  res.json(menu);
});

app.listen(5003, () => {
  console.log("🍽️ Cafeteria Server running on port 5003");
});