const mongoose = require('mongoose');
const { Document, Model, Schema } = mongoose;

// Define the schema
const locationSchema = new Schema({
  locationName: {
    type: String,
    required: true,
  },
  coordinates: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
});

// Define the model
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
