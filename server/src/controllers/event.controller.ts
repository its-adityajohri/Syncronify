import { Request, Response } from 'express';
// import Event from '../models/event.model';
import { PersonalEvent, PostedEvent } from '../models/event.model'; 
import { GeneralUser, AdminUser, ApplicationAdminUser } from '../models/user.model';

interface CustomRequest extends Request {
    user?: { userId: string; userType: string };
}

export const getAllPostedEvents = async (req: CustomRequest, res: Response) => {
  try {
    const postedEvents = await PostedEvent.find({ eventType: 'posted' });
    res.status(200).json(postedEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserEvents = async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      const user = await GeneralUser.findById(userId).populate('attendingEvents');
      res.status(200).json(user?.attendingEvents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
};

export const getAllPostedEventsByAdmin = async (req: CustomRequest, res: Response) => {
    try {
      const adminUserId = req.user?.userId; 
      const adminUser = await AdminUser.findById(adminUserId);
      const postedEvents = adminUser?.postedEvents;
      res.status(200).json(postedEvents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const createPersonalEvent = async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user?.userId; 
      const event = new PersonalEvent({ ...req.body, admin: userId });
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export const createPostedEvent = async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user?.userId; 
      const event = new PostedEvent({ ...req.body, admin: userId });
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};


export const updatePersonalEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params; // Assuming you're getting the event's ID from the URL parameters
  const updateData = { ...req.body };

  try {
    const updatedEvent = await PersonalEvent.findByIdAndUpdate(eventId, { $set: updateData }, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "An error occurred", error });
  }
};


export const updatePostedEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params; // Assuming you're getting the event's ID from the URL parameters
    const updateData = { ...req.body };
  
    try {
      const updatedEvent = await PostedEvent.findByIdAndUpdate(eventId, { $set: updateData }, { new: true });
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(updatedEvent);
    } catch (error) {
      res.status(500).json({ message: "An error occurred", error });
    }
};


// import { Request, Response, NextFunction } from 'express';
// import Event from '../models/event.model';
// import mongoose from 'mongoose';

// // Utility to filter object properties
// const filterObj = (obj: any, ...allowedFields: string[]) => {
//     const newObj: any = {};
//     Object.keys(obj).forEach(el => {
//         if (allowedFields.includes(el)) newObj[el] = obj[el];
//     });
//     return newObj;
// };

// export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const filteredBody = filterObj(req.body, 'title', 'description', 'imgLink', 'venue', 'eventType', 'organizingBody', 'contact', 'capacity');
//         const newEvent = await Event.create(filteredBody);
//         res.status(201).json({
//             status: 'success',
//             data: {
//                 event: newEvent,
//             },
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: err,
//         });
//     }
// };

// export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         if (!event) {
//             return res.status(404).json({
//                 status: 'fail',
//                 message: 'No event found with that ID',
//             });
//         }
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 event,
//             },
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: err,
//         });
//     }
// };

// export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const event = await Event.findByIdAndDelete(req.params.id);
//         if (!event) {
//             return res.status(404).json({
//                 status: 'fail',
//                 message: 'No event found with that ID',
//             });
//         }
//         res.status(204).json({
//             status: 'success',
//             data: null,
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: err,
//         });
//     }
// };

// export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const event = await Event.findById(req.params.id);
//         if (!event) {
//             return res.status(404).json({
//                 status: 'fail',
//                 message: 'No event found with that ID',
//             });
//         }
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 event,
//             },
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: err,
//         });
//     }
// };

// export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const events = await Event.find();
//         res.status(200).json({
//             status: 'success',
//             results: events.length,
//             data: {
//                 events,
//             },
//         });
//     } catch (err) {
//         res.status(400).json({
//             status: 'fail',
//             message: err,
//         });
//     }
// };