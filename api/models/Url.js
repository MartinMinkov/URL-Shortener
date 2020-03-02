const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
  slug: {
    type: String,
    required: true
  },
  destination: {
    type: String
  },
  count: {
    type: Number
  }
});

module.exports = Url = mongoose.model("url", UrlSchema);
