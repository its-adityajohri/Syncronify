import mongoose, { Document, Schema, Model } from 'mongoose';

interface IMessage extends Document {
  to: Schema.Types.ObjectId;
  from: Schema.Types.ObjectId;
  type: 'Text' | 'Media' | 'Document' | 'Link';
  created_at: Date;
  text?: string;
  file?: string;
}

interface IOneToOneMessage extends Document {
  participants: Schema.Types.ObjectId[];
  messages: IMessage[];
}

interface OneToOneMessageModelInterface extends Model<IOneToOneMessage> {}

const oneToOneMessageSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      type: {
        type: String,
        enum: ['Text', 'Media', 'Document', 'Link'],
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      text: {
        type: String,
      },
      file: {
        type: String,
      },
    },
  ],
});

const OneToOneMessage : OneToOneMessageModelInterface = mongoose.model<IOneToOneMessage>('OneToOneMessage', oneToOneMessageSchema);

export default OneToOneMessage;
