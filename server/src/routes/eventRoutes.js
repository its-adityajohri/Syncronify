const router = require('express').Router();
const eventController = require('../controllers/eventController.js');
const authController = require("../controllers/auth.contollers.js");

router.get('/all-posted-events', authController.protectGeneralUser,eventController.getAllPostedEvents);
router.post('/create-personal-event', authController.protectGeneralUser,eventController.createPersonalEvent);
router.post('/create-event', authController.protectAdminUser,eventController.createPostedEvent);
router.get('/user-events', authController.protectGeneralUser,eventController.getUserEvents);
router.get('/all-organization-events', authController.protectAdminUser,eventController.getAllPostedEventsByAdmin);
router.get('/event-details', authController.protectGeneralUser,eventController.getEventDetails);

module.exports = router;