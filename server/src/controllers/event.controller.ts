import { Request, Response, NextFunction } from 'express';
import Event from '../models/event.model';
import mongoose from 'mongoose';

// Utility to filter object properties
const filterObj = (obj: any, ...allowedFields: string[]) => {
    const newObj: any = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filteredBody = filterObj(req.body, 'title', 'description', 'imgLink', 'venue', 'eventType', 'organizingBody', 'contact', 'capacity');
        const newEvent = await Event.create(filteredBody);
        res.status(201).json({
            status: 'success',
            data: {
                event: newEvent,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!event) {
            return res.status(404).json({
                status: 'fail',
                message: 'No event found with that ID',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                event,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({
                status: 'fail',
                message: 'No event found with that ID',
            });
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({
                status: 'fail',
                message: 'No event found with that ID',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                event,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

export const getAllEvents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const events = await Event.find();
        res.status(200).json({
            status: 'success',
            results: events.length,
            data: {
                events,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};
