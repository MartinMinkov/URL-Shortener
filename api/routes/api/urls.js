const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

const Url = require("../../models/Url");

// @route   GET api/urls
// @desc    Get a URL
// @access  public
router.get("/", async (req, res) => {
  try {
    const urls = await Url.find().sort({ date: -1 });
    res.json(urls);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Sever error");
  }
});

// @route   POST api/urls
// @desc    Create a URL
// @access  public
router.post(
  "/",
  [check("slug", "Valid URL is required").isURL()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { slug, userId } = req.body;

    try {
      const url = new Url({
        slug,
        userId,
        count: 0
      });
      await url.save();
      res.json(url);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Sever error");
    }
  }
);

module.exports = router;
