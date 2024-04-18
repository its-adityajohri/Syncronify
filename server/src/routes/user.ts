const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");
const authController = require("../controllers/authController");

// Routes for General Users
router.get("/events/posted", authController.protectGeneralUser, eventController.getAllPostedEvents);
router.get("/events/attending", authController.protectGeneralUser, eventController.getAttendingEvents);
router.post("/events/personal", authController.protectGeneralUser, eventController.createPersonalEvent);
router.post("/events/posted", authController.protectGeneralUser, eventController.createPostedEvent);

// Routes for Admin Users
router.get("/events/posted/byAdmin", authController.protectAdminUser, eventController.getPostedEventsByAdmin);

// Assuming there are specific routes that only Application Admin Users can access
// Example:
// router.get("/admin/special", authController.protectApplicationAdminUser, specialAdminController.specialAdminFunction);

module.exports = router;
