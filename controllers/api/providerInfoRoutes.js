const router = require("express").Router();
const { ProviderInfo, Service } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const providerInfoData = await providerInfoData.findAll({
      include: Service,
    });
    res.status(200).json(providerInfoData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const providerInfo = await ProviderInfo.findAll(req.params.id, {
      include: Service,
    });
    if (!providerInfo) {
      res
        .status(404)
        .json({ message: "couldn't find information on provider" });
    } else {
      res.status(200).json(providerInfo);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const providerInfoData = await ProviderInfo.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log("session userid: " + req.session.user_id);
    
    res.status(200).json(providerInfoData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put("/:id", async (req, res) => {
  try {
    const provider = await ProviderInfo.update(req.body, {
      where: { id: req.params.id },
    });
    console.log("update button user data" + provider);

    res.status(200).json(provider);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const providerInfoData = await ProviderInfo.destroy({
      where: {
        id: req.params.id,
       // user_id: req.session.user_id,
      },
    });
    if (providerInfoData) {
      res.status(200).json(providerInfoData);
    } else {
      res.status(404).json({ message: "Delete failed." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
