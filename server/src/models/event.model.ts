import mongoose, { Document, Model, Types } from 'mongoose';
// const geocoder = require('./utils/geocoder'); // You would need to implement or include a geocoder utility

interface IEvent extends Document {
    title: string;
    description: string;
    imgLink?: string; // Optional as it's not marked required in the schema
    venue: {
      latitude: number;
      longitude: number;
    };
    eventType: 'personal' | 'posted';
    organizingBody?: string; // Optional as it's specific to 'posted' events and not marked required
    admin: Types.ObjectId; // Assuming this refers to a User document
    contact?: string; // Optional as it's not marked required
    attendees: Types.ObjectId[]; // Array of User document references
    capacity?: number; // Optional as it's not marked required
    createdAt?: Date; // Optional as it has a default value
}

interface EventModelInterface extends Model<IEvent> {}


const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required for the event'],
  },
  description: {
    type: String,
    required: [true, 'A description is required for the event'],
  },
  imgLink: {
    type: String, // Assuming images are stored and managed through Cloudinary
  },
  venue: {
    latitude: {
      type: Number,
      required: [true, 'Latitude is required'],
    },
    longitude: {
      type: Number,
      required: [true, 'Longitude is required'],
    }
  },
  eventType: {
    type: String,
    enum: ['personal', 'posted'],
    required: true,
  },
  organizingBody: String, // Specific to 'posted' events
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Assuming you have a User model
  },
  contact: String, // Contact information for posted events
  attendees: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  capacity: Number, // An innovative feature could be to limit the number of attendees
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Geocode & create location field
// eventSchema.pre('save', async function(next) {
//   if (this.isModified('venue') || this.isNew) {
//     const loc = await geocoder.geocode(`${this.venue.latitude},${this.venue.longitude}`);
//     this.location = {
//       // Assuming the geocoder returns an array with the formatted address
//       type: 'Point',
//       coordinates: [loc[0].longitude, loc[0].latitude],
//       formattedAddress: loc[0].formattedAddress,
//     };

//     // Do not save the original venue coordinates
//     this.venue = undefined;
//   }
//   next();
// });

// Instance method to check if the event capacity has been reached
eventSchema.methods.isFull = function() {
  return this.attendees.length >= this.capacity;
};

// Instance method to add an attendee
eventSchema.methods.addAttendee = async function(userId: number) {
    if (this.isFull()) {
        throw new Error('Event capacity has been reached');
    }

    this.attendees.push(userId);
    await this.save();
};

const Event: EventModelInterface = mongoose.model<IEvent>('Event', eventSchema);

module.exports = Event;
