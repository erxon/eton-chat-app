import mongoose from "mongoose";
const { Schema } = mongoose;

export interface Users extends mongoose.Document {
  name: String;
  email: String;
  hash: String;
  salt: String;
  createdAt: Date;
  emailVerified: Date;
  image: String;
  online: Boolean;
}

const userSchema = new Schema<Users>({
  name: String,
  email: {
    type: String,
    required: true,
  },
  emailVerified: Date,
  image: String,
  online: Boolean,
  hash: String,
  salt: String,
  createdAt: Date,
});

export default mongoose.models.User ||
  mongoose.model<Users>("User", userSchema);
