const { GeneralUser, AdminUser, ApplicationAdminUser } = require('../models/userModel.js');
const { Event, PersonalEvent, PostedEvent } = require('../models/eventModel.js');
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js'); // You might need to create this to handle errors

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

exports.createPersonalEvent = catchAsync(async (req, res, next) => {
  const { title, description, eventDate, eventTiming } = req.body;
  const newEvent = await PersonalEvent.create({
    title,
    description,
    eventDate,
    eventTiming,
    admin: req.user.userId, // assuming admin field exists in PersonalEvent
  });

  res.status(201).json({
    status: 'success',
    data: {
      event: newEvent,
    },
  });
});

exports.createPostedEvent = catchAsync(async (req, res, next) => {
  const { title, description, eventDate, eventTiming, communityName, organizationName } = req.body;
  const newEvent = await PostedEvent.create({
    title,
    description,
    eventDate,
    eventTiming,
    communityName,
    organizationName,
    admin: req.user.userId,
  });

  res.status(201).json({
    status: 'success',
    data: {
      event: newEvent,
    },
  });
});

exports.getUserEvents = catchAsync(async (req, res, next) => {
  const userEvents = await Event.find({ admin: req.user.userId });
  res.status(200).json({
    status: 'success',
    results: userEvents.length,
    data: {
      events: userEvents,
    },
  });
});

exports.getAllPostedEventsByAdmin = catchAsync(async (req, res, next) => {
  const adminEvents = await PostedEvent.find({ admin: req.user.userId });
  res.status(200).json({
    status: 'success',
    results: adminEvents.length,
    data: {
      events: adminEvents,
    },
  });
});

exports.getEventDetails = catchAsync(async (req, res, next) => {
  const { eventId } = req.query; // Assuming event ID is passed as a query parameter
  const event = await Event.findById(eventId);

  if (!event) {
    return next(new AppError('No event found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      event,
    },
  });
});



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
