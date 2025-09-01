import mongoose from 'mongoose';
import { User } from '../src/models/User';
import { VerificationToken } from '../src/models/VerificationToken';
import { PasswordResetToken } from '../src/models/PasswordResetToken';

beforeEach(async () => {
  // Clean up test data
  await PasswordResetToken.deleteMany();
  await VerificationToken.deleteMany();
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});
