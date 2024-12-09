import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String, required: true },
    sessions: [{type: Schema.Types.ObjectId, ref: 'Session' }]
  },
  { timestamps: true }
);

const User = models.User || model('User', UserSchema);

export default User;
