const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  userId: {
    type: String
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
