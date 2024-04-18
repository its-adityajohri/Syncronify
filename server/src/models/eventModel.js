const mongoose = require('mongoose');
// const geocoder = require('./utils/geocoder'); // You would need to implement or include a geocoder utility if needed.

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
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  eventType: {
    type: String,
    enum: ['personal', 'posted'],
    required: true,
  },
  eventDate: { type: Date, required: true }, // Add event date
  eventTiming: { // Add event timing with from and to times
    from: String,
    to: String,
  },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  capacity: {
    type: Number,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Admin is required for posted events'],
  },
});

// Instance method to check if the event capacity has been reached
eventSchema.methods.isFull = function() {
  return this.attendees && this.capacity && this.attendees.length >= this.capacity;
};

// Instance method to add an attendee
eventSchema.methods.addAttendee = async function(userId) {
    if (this.isFull()) {
        throw new Error('Event capacity has been reached');
    }

    this.attendees.push(userId);
    await this.save();
};

const Event = mongoose.model('Event', eventSchema);
const PersonalEvent = Event.discriminator('PersonalEvent', personalEventSchema);
const PostedEvent = Event.discriminator('PostedEvent', postedEventSchema);

module.exports = { Event, PersonalEvent, PostedEvent };
