const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
connectDB();
const PORT = process.env.PORT || 3001;

// Init Middleware
app.use(
  express.json({
    extended: false
  }),
  cors()
);

app.get("/", (req, res) => {
  res.send("API Running");
});

// Define Routes
app.use("/api/urls", require("./routes/api/urls"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
