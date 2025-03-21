const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));


const clickSchema = new mongoose.Schema({
  action: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const Click = mongoose.model("Click", clickSchema);


app.get("/", (req, res) => {
  res.send("Welcome to the Click Logger API!");
});

app.post("/log-click", async (req, res) => {
  const { action, timestamp } = req.body;

  if (!action || !timestamp) {
    return res.status(400).json({ error: "Action and timestamp are required." });
  }

  try {
    const newClick = new Click({ action, timestamp });
    await newClick.save();
    res.status(201).json({ message: "Click logged successfully!" });
  } catch (error) {
    console.error("Error saving click:", error);
    res.status(500).json({ error: "Failed to log click." });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on https://love-bundle.onrender.com`);
});
