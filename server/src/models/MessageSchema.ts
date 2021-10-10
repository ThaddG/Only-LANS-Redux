import { Schema, model, Model, Document, Types } from 'mongoose';

// interface
export interface MessageProps extends Document {
  Sender: string;
  Content: string;
  CreatedDate: Date;
  UpdatedDate: Date;
  ChatId: Types.ObjectId;
}

const MessageSchema = new Schema({
  Sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  Content: String,
  CreatedDate: Date,
  UpdatedDate: Date,
  ChatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chat',
  },
});

export const Message: Model<MessageProps> = model('Message', MessageSchema);