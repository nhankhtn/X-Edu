const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.get("/landing/:slug", siteController.landing);
router.get("/profile/:email", siteController.profileUser);
router.get("/settings", siteController.settings);
router.get("/my-courses", siteController.myCourses);
router.get("/", siteController.index);

module.exports = router;
