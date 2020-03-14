const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const randomstring = require("randomstring");

const Url = require("../../models/Url");

// @route   GET api/urls
// @desc    Get URLs
// @access  public
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const urls = await Url.find({ userId }).sort({ date: -1 });
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
  [check("destination", "Valid URL is required").isURL()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { destination, userId } = req.body;
    const slug = randomstring.generate(6);

    try {
      const url = new Url({
        destination,
        slug,
        userId
      });
      await url.save();
      res.json(url);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Sever error");
    }
  }
);

// @route   GET api/urls/:slug
// @desc    Get a URL
// @access  public
router.get("/:slug", async (req, res) => {
  try {
    const url = await Url.findOne({ slug: req.params.slug });
    if (!url) {
      return res.status(404).json({ msg: "Not valid URL" });
    }
    url.count += 1;
    await url.save();
    res.status(200).redirect(`${url.destination}`);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Sever error");
  }
});

// @route   DELETE api/urls/:id
// @desc    Delete a URL
// @access  public
router.delete("/:id", async (req, res) => {
  try {
    await Url.deleteOne({ _id: req.params.id });
    res.status(200).send();
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Sever error");
  }
});

module.exports = router;
