const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

// Define the schema
const communitySchema = new Schema({
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

// Define the model
const Community = mongoose.model('Community', communitySchema);

module.exports = Community;
