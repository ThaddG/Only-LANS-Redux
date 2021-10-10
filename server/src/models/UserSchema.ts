import { Schema, model, Model, Document } from 'mongoose';

// interfaces
export interface UserProps extends Document {
  Name: string;
  Email: string;
}

const UserSchema = new Schema({
  Name: { type: String, required: true },
  Email: { type: String, unique: true, required: true },
});

export const User: Model<UserProps> = model('User', UserSchema);
