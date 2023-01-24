const router = require("express").Router();
const { ProviderInfo, User} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const providerData = await ProviderInfo.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const providers = providerData.map((providerInfo) =>
      providerInfo.get({ plain: true })
    );

    console.log("providers from homeroutes get " +providers)

    // Pass serialized data and session flag into template
    res.render("login", {
      providers,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//don't think we're using this
// router.get("/providers/:id", async (req, res) => {
//   try {
//     const providerData = await ProviderInfo.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });

//     const providers = providerData.get({ plain: true });

//     res.render("provider-signup", {
//       ...providers,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: ProviderInfo }],
    });

    const user = userData.get({ plain: true });
      console.log("user from homeroutes getprofile " + JSON.stringify(user));

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/listings", withAuth, async (req, res) => {
  try {
    // FIXME: I think this is going to need to be a find all not findbypk so we can display all provider info listings
    const providerInfoData = await ProviderInfo.findAll({
      include: [{ model: User }],
    });

  const listings = providerInfoData.map((providerInfo) => providerInfo.get({ plain: true }));
    console.log("listings from homeroutes get listings "+listings);
    res.render("listings", {
      listings,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/userupdate", withAuth, async (req, res) => {
  try {
    // FIXME: I think this is going to need to be a find all not findbypk so we can display all provider info listings
    const userData = await User.findByPk(req.session.user_id, {
    });

    const user = userData.get({ plain: true });
    console.log("users from homeroutes get listings" + user);
    res.render("user-update", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/providerupdate", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: ProviderInfo }],
    });
    const user = userData.get({ plain: true });
    console.log("data from providerupdate search " + user);
    res.render("provider-update", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/listings");
    return;
  }
  //if not not logged in show the login page
  res.render("login");
});


router.get("/providersignup", withAuth, async(req, res) => {
   if (req.session.logged_in) {
    const userData = await User.findByPk(req.session.user_id, {
    });

    const user = userData.get({ plain: true });
   res.render("provider-signup", {
      ...user,
      logged_in: true,
    });
    return;
   }
   //if not not logged in show the login page
   res.render("login");
  
});

// router.get("/profile", (req, res) => {
//   res.render("profile");
// });

// router.get("/listings", (req, res) => {
//   res.render("listings");
// });

module.exports = router;
