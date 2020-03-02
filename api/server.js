const express = require("express");
const connectDB = require("./config/db");

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

// Init Middleware
app.use(
  express.json({
    extended: false
  })
);

app.get("/", (req, res) => {
  res.send("API Running");
});

// Define Routes
app.use("/api/urls", require("./routes/api/urls"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
