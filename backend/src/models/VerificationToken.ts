import mongoose, { Document, Schema } from 'mongoose';

export interface IVerificationToken extends Document {
  _id: string;
  token: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
}

const VerificationTokenSchema = new Schema<IVerificationToken>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 }, // MongoDB TTL index
  },
}, {
  timestamps: true,
});

export const VerificationToken = mongoose.model<IVerificationToken>('VerificationToken', VerificationTokenSchema);
