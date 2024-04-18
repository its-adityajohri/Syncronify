const { GeneralUser, AdminUser, ApplicationAdminUser } = require('../models/userModel.js');
const { Event, PersonalEvent, PostedEvent } = require('../models/eventModel.js');
const catchAsync = require('../utils/catchAsync.js');
const { upload } = require('../services/multerUploadService.js');

const mongoose = require('mongoose');
const Event = require('../models/Event'); // Path to Event model
const Location = require('../models/Location'); // Path to Location model
const User = require('../models/User'); // Path to User model

exports.getAllPostedEvents = catchAsync(async (req, res, next) => {
  const events = await PostedEvent.find();
  res.status(200).json({
    status: 'success',
    results: events.length,
    data: {
      events,
    },
  });
});

exports.createPersonalEvent = async (req, res) => {
    try {
        // Extracting data from request body
        const { title, description, imgLink, eventDateFrom, eventDateTo, locationData } = req.body;

        // Create location first if location data is provided
        let location;
        if (locationData) {
            location = new Location({
                locationName: locationData.locationName,
                coordinates: {
                    latitude: locationData.coordinates.latitude,
                    longitude: locationData.coordinates.longitude
                }
            });
            await location.save();
        }

        const userId = req.user.userId;
        // Create a new personal event
        const personalEvent = new PersonalEvent({
            title,
            description,
            eventType: 'personal',
            eventDateFrom,
            eventDateTo,
            imgLink: imgLink || '', // Use provided image link or default to empty string if not provided
            location: location ? location._id : undefined, // Use location id if location was created
            admin: userId
        });

        // Save the event
        await personalEvent.save();

        // Find the user by ID provided in request (assuming req.user.id is set by middleware)
        const user = await User.findById(userId);

        // Add the event to the user's attending events
        user.attendingEvents.push(personalEvent._id);
        await user.save();

        // Send response back
        res.status(201).json({
            status: 'success',
            data: {
                event: personalEvent
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Failed to create personal event',
            error: error.message
        });
    }
};


exports.createPostedEvent = async (req, res) => {
  try {
      // Extracting data from request body
      const { title, description, imgLink, eventDateFrom, eventDateTo, locationData } = req.body;

      // Create location first if location data is provided
      let location;
      if (locationData) {
          location = new Location({
              locationName: locationData.locationName,
              coordinates: {
                  latitude: locationData.coordinates.latitude,
                  longitude: locationData.coordinates.longitude
              }
          });
          await location.save();
      }

      // Retrieve the admin's ID from the request
      const adminId = req.user.userId;

      // Create a new posted event
      const postedEvent = new PostedEvent({
          title,
          description,
          eventType: 'posted',
          eventDateFrom,
          eventDateTo,
          imgLink: imgLink || '', // Use provided image link or default to empty string if not provided
          location: location ? location._id : undefined, // Use location id if location was created
          admin: adminId // Assign the admin who is creating the event
      });

      // Save the event
      await postedEvent.save();

      // Find the admin user by ID and add the event to their posted events
      const admin = await User.findById(adminId);
      if (!admin.postedEvents) {
          admin.postedEvents = [];
      }
      admin.postedEvents.push(postedEvent._id);
      await admin.save();

      // Send response back
      res.status(201).json({
          status: 'success',
          data: {
              event: postedEvent
          }
      });
  } catch (error) {
      res.status(400).json({
          status: 'error',
          message: 'Failed to create posted event',
          error: error.message
      });
  }
};

exports.getUserEvents = async (req, res) => {
  try {
      // Retrieve the user ID from request (assumed to be set by middleware in req.user.id)
      const userId = req.user.userId;

      // Find the user by ID and populate the attendingEvents array
      const user = await User.findById(userId)
          .populate({
              path: 'attendingEvents',
              select: 'title description eventDateFrom eventDateTo location eventType imgLink'
          });

      if (!user) {
          return res.status(404).json({
              status: 'fail',
              message: 'User not found'
          });
      }

      // Send back the list of events the user is attending
      res.status(200).json({
          status: 'success',
          data: {
              events: user.attendingEvents
          }
      });
  } catch (error) {
      res.status(400).json({
          status: 'error',
          message: 'Error retrieving user events',
          error: error.message
      });
  }
};

exports.getAllPostedEventsByAdmin = async (req, res) => {
  try {
      // Retrieve the admin's ID from request (assuming it's set in req.user.id or req.body.adminId)
      const adminId = req.user.userId ;

      // Query the database for all posted events where the admin is the current user
      const events = await Event.find({
          eventType: 'posted',
          admin: adminId
      }).populate('location', 'locationName coordinates').populate('attendees', 'userName firstName lastName');

      // Send back the list of events
      res.status(200).json({
          status: 'success',
          data: {
              events
          }
      });
  } catch (error) {
      res.status(400).json({
          status: 'error',
          message: 'Error retrieving posted events by admin',
          error: error.message
      });
  }
};

exports.addEventToUser = async (req, res) => {
  try {
      const userId = req.user.id; // Assuming userId is set by authentication middleware
      const { eventId } = req.body; // Assuming the event ID is passed in the request body

      // First, check if the event exists and is a posted event
      const event = await Event.findOne({ _id: eventId, eventType: 'posted' });
      if (!event) {
          return res.status(404).json({
              status: 'fail',
              message: 'Event not found or not a posted event'
          });
      }

      // Now, find the user and add the event to the attendingEvents array
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({
              status: 'fail',
              message: 'User not found'
          });
      }

      // Check if the event is already in the attending list
      if (user.attendingEvents.includes(eventId)) {
          return res.status(409).json({
              status: 'fail',
              message: 'User already attending this event'
          });
      }

      // Add the event to the user's attending events
      user.attendingEvents.push(eventId);
      await user.save();

      // Send response back
      res.status(200).json({
          status: 'success',
          data: {
              user: {
                  id: user._id,
                  attendingEvents: user.attendingEvents
              }
          }
      });
  } catch (error) {
      res.status(500).json({
          status: 'error',
          message: 'Failed to add event to user',
          error: error.message
      });
  }
};

exports.getEventDetails = async (req, res) => {
  try {
      const { eventId } = req.body; // Assume event ID is provided in the request body

      // Retrieve the event by ID and populate related fields
      const event = await Event.findById(eventId)
          .populate('location', 'locationName coordinates')
          .populate('attendees', 'userName firstName lastName')
          .populate('admin', 'userName firstName lastName'); // Populate admin if it's a posted event

      if (!event) {
          return res.status(404).json({
              status: 'fail',
              message: 'Event not found'
          });
      }

      // Send back the event details
      res.status(200).json({
          status: 'success',
          data: {
              event
          }
      });
  } catch (error) {
      res.status(400).json({
          status: 'error',
          message: 'Error retrieving event details',
          error: error.message
      });
  }
};


// const getAllPostedEvents = async (req, res) => {
//   try {
//     const postedEvents = await PostedEvent.find({ eventType: 'posted' });
//     res.status(200).json(postedEvents);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getUserEvents = async (req, res) => {
//     try {
//       const userId = req.user && req.user.userId;
//       const user = await GeneralUser.findById(userId).populate('attendingEvents');
//       res.status(200).json(user ? user.attendingEvents : []);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// };

// const getAllPostedEventsByAdmin = async (req, res) => {
//     try {
//       const adminUserId = req.user && req.user.userId; 
//       const adminUser = await AdminUser.findById(adminUserId);
//       const postedEvents = adminUser ? adminUser.postedEvents : [];
//       res.status(200).json(postedEvents);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// };

// const createPersonalEvent = async (req, res) => {
//     try {
//       const userId = req.user && req.user.userId; 
//       const event = new PersonalEvent({ ...req.body, admin: userId });
//       await event.save();
//       res.status(201).json(event);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// };

// const createPostedEvent = async (req, res) => {
//     try {
//       const userId = req.user && req.user.userId; 
//       const event = new PostedEvent({ ...req.body, admin: userId });
//       await event.save();
//       res.status(201).json(event);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// };

// const updatePersonalEvent = async (req, res) => {
//   const { eventId } = req.params;
//   const updateData = { ...req.body };

//   try {
//     const updatedEvent = await PersonalEvent.findByIdAndUpdate(eventId, { $set: updateData }, { new: true });
//     if (!updatedEvent) {
//       return res.status(404).json({ message: "Event not found" });
//     }
//     res.status(200).json(updatedEvent);
//   } catch (error) {
//     res.status(500).json({ message: "An error occurred", error });
//   }
// };

// const updatePostedEvent = async (req, res) => {
//     const { eventId } = req.params;
//     const updateData = { ...req.body };
  
//     try {
//       const updatedEvent = await PostedEvent.findByIdAndUpdate(eventId, { $set: updateData }, { new: true });
//       if (!updatedEvent) {
//         return res.status(404).json({ message: "Event not found" });
//       }
//       res.status(200).json(updatedEvent);
//     } catch (error) {
//       res.status(500).json({ message: "An error occurred", error });
//     }
// };

// module.exports = {
//     getAllPostedEvents,
//     getUserEvents,
//     getAllPostedEventsByAdmin,
//     createPersonalEvent,
//     createPostedEvent,
//     updatePersonalEvent,
//     updatePostedEvent
// };
