import { Schema, model, Model, Document } from 'mongoose';

// interfaces
export interface ChatProps extends Document {
  CreatedDate: Date;
}

const ChatSchema = new Schema({
  CreatedDate: { type: Date, index: true },
});

export const Chat: Model<ChatProps> = model('Chat', ChatSchema);
