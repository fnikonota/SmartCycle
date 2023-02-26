const express = require("express");
const router = express.Router();

/* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

router.get("/", function (req, res) {
  console.log("req.session====", req.session);
  if (!req.session || !req.session?.currentUser) {
    console.log("No session or current user====");
    res.redirect("/auth/login");
  } else {
    console.log("Session and current user====");
    res.render("index", {
      title: "Home",
      currentUser: req.session.currentUser,
    });
  }
});

router.get("/restaurants", function (req, res) {
  // if (!req.session || !req.session.currentUser) {
  //   console.log("No session or current user====");
  //   res.redirect("/auth/login");
  // } else {
    res.render("../views/restaurant-views/restaurants", {
      title: "Restaurants",
      // currentUser: req.session.currentUser,
    });
  // }
});

module.exports = router;
