import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface IRequestDocument extends Document {
  userType: 'communityAdminRequest' | 'eventAdminRequest';
  communityName: string;
  requester: Types.ObjectId; // Reference to the User who made the request
  status: 'pending' | 'approved' | 'rejected'; // Track the status of the request
}

const requestSchema = new Schema<IRequestDocument>({
  userType: {
    type: String,
    enum: ['communityAdminRequest', 'eventAdminRequest'],
    required: true,
  },
  communityName: {
    type: String,
    required: true,
  },
  requester: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
});

const Request: Model<IRequestDocument> = mongoose.model<IRequestDocument>('Request', requestSchema);

export default Request;
