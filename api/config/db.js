const mongoose = require("mongoose");
require("dotenv").config();
const DB_KEY = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Mongoose connected");
  } catch (err) {
    console.err(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
