const express = require("express");
const router = express.Router();

// @route   GET api/urls
// @desc    Get a URL
// @access  public
router.get("/", (req, res) => {
  res.send("URL Route");
});

module.exports = router;
