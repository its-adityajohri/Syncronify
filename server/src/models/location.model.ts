import mongoose, { Document, Model, Schema } from 'mongoose';

// Define the interface for the document
interface ILocation extends Document {
  locationName: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Define the schema
const locationSchema = new Schema<ILocation>({
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
const Location: Model<ILocation> = mongoose.model<ILocation>('Location', locationSchema);

export default Location;
