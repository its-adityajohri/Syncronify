import mongoose, { Document, Model, Types } from 'mongoose';
// const geocoder = require('./utils/geocoder'); // You would need to implement or include a geocoder utility

interface IEventDocument extends Document {
    title: string;
    description: string;
    imgLink?: string; // Optional as it's not marked required in the schema
    location?: Types.ObjectId;
    eventType: 'personal' | 'posted';  // Array of User document references
     // Optional as it's not marked required
    eventDate: Date; // Required field
    eventTiming?: { from: string; to: string }; 
    createdAt?: Date; // Optional as it has a default value

    // Declare the instance methods here
    isFull(): boolean;
    addAttendee(userId: Types.ObjectId): Promise<void>;
}

interface IPersonalEventDocument extends IEventDocument {
  // Personal event-specific fields if any
}

interface IPostedEventDocument extends IEventDocument {
  extraInfo: string; // Example of a field specific to posted events
  capacity?: number;
  communityName: string;
  organizationName: string; // Optional as it's specific to 'posted' events and not marked required
  admin: Types.ObjectId;
  contact?: string; 
  attendees: Types.ObjectId[];
}


interface EventModel extends Model<IEventDocument> {}
interface PersonalEventModel extends Model<IPersonalEventDocument> {}
interface PostedEventModel extends Model<IPostedEventDocument> {}



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
  location: { type: Types.ObjectId, ref: 'Location' },
  eventType: {
    type: String,
    enum: ['personal', 'posted'],
    required: true,
  },
  eventDate: { type: Date, required: true }, // Add event date
  eventTiming: { // Add event timing with from and to times
    from: String,
    to: String,
  }, // An innovative feature could be to limit the number of attendees
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const personalEventSchema = new mongoose.Schema({
  // PersonalEvent specific fields here
  // For example, there might not be any additional fields for personal events
});

const postedEventSchema = new mongoose.Schema({
  // PostedEvent specific fields here
  extraInfo: {
    type: String,
  },
  communityName: {
    type: String,
    required: [true, 'Community name is required for posted events'],
  },
  organizationName: {
    type: String,
    required: [true, 'Organization name is required for posted events'],
  },
  contact: {
    type: String,
  },
  attendees: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  capacity: {
    type: Number,
  },
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Admin is required for posted events'],
  },
});


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

const Event: EventModel = mongoose.model<IEventDocument>('Event', eventSchema);

// Create discriminators
const PersonalEvent : PersonalEventModel = Event.discriminator<IPersonalEventDocument>('PersonalEvent', personalEventSchema);
const PostedEvent : PostedEventModel = Event.discriminator<IPostedEventDocument>('PostedEvent', postedEventSchema);


export default Event;
export { PersonalEvent, PostedEvent };
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