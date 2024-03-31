import mongoose, { Document, Model, Types } from 'mongoose';

interface ICommunityDocument extends Document {
    coummunityName: string;
    communityAdmin: Types.ObjectId;
    eventAdmins: Types.ObjectId[];
}

interface ICommunityModel extends Model<ICommunityDocument> {}

const communitySchema = new mongoose.Schema({
    communityName: {
        type: String,
        required: [true, 'A community name is required'],
    },
    communityAdmin: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'A community admin is required'],
    },
    eventAdmins: [{
        type: Types.ObjectId,
        ref: 'User',
    }],
});

const Community : ICommunityModel = mongoose.model<ICommunityDocument>('Community', communitySchema);

export default Community;