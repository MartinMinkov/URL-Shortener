const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  destination: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});

module.exports = Url = mongoose.model("url", UrlSchema);
