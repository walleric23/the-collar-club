const router = require("express").Router();
const { Review, ProviderInfo } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const reviewData = await Review.findAll({ include: ProviderInfo });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reviewData = await Review.findAll(req.params.id, {
      include: ProviderInfo,
    });
    if (!reviewData) {
      res.status(404).json({ message: "couldn't find reviews" });
    } else {
      res.status(200).json(reviewData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const reviewData = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!reviewData[0]) {
      res.status(404).json({ message: "couldn't find review" });
      return;
    }
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (reviewData) {
      res.status(200).json(reviewData);
    } else {
      res.status(404).json({ message: "couldn't find review" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
