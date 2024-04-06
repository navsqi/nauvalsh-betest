import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    requied: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  identityNumber: {
    type: String,
    required: true,
    minLength: 16,
    maxLength: 16,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
