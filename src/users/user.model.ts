import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    designation: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  },
);

export interface User extends Document {
  name: string;
  designation: string;
  description: string;
  image: string;
}
